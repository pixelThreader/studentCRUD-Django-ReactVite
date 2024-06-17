# pip install faker

import json
from faker import Faker
import random
import concurrent.futures
import threading
import time

lis_female_profs = [
    '/static/profiles/user-female.jpg',
    '/static/profiles/user-female2.jpg',
    '/static/profiles/user-female3.jpg',
    '/static/profiles/user-female4.jpg',
    '/static/profiles/user-female5.jpg',
    '/static/profiles/user-female6.jpg',
    '/static/profiles/user-female7.jpg',
    '/static/profiles/user-female8.jpg',
    '/static/profiles/user-female9.jpg',
    '/static/profiles/user-female10.jpg'
]

lis_male_profs = [
    '/static/profiles/user-male.jpg',
    '/static/profiles/user-male2.jpg',
    '/static/profiles/user-male3.jpg',
    '/static/profiles/user-male4.jpg',
    '/static/profiles/user-male5.jpg',
    '/static/profiles/user-male6.jpg',
    '/static/profiles/user-male7.jpg',
    '/static/profiles/user-male8.jpg',
    '/static/profiles/user-male9.jpg',
    '/static/profiles/user-male10.jpg'
]

fake = Faker()

sno_counter = 1
used_usernames = set()
counter_lock = threading.Lock()
username_lock = threading.Lock()

def getUserProfile(gender):
    if gender == 'female':
        return random.choice(lis_female_profs)
    elif gender == 'male':
        return random.choice(lis_male_profs)
    else:
        return '/static/profiles/user.jpg'

def generate_unique_username():
    while True:
        username = fake.user_name()
        with username_lock:
            if username not in used_usernames:
                used_usernames.add(username)
                return username

def generateStudent():
    global sno_counter
    with counter_lock:
        sno = sno_counter
        sno_counter += 1

    gender = random.choice(['male', 'female'])
    if gender == 'male':
        first_name = fake.first_name_male()
    else:
        first_name = fake.first_name_female()

    last_name = fake.last_name()
    name = f"{first_name} {last_name}"

    student = {
        'user': generate_unique_username(),
        'sno': sno,
        'admission_no': fake.unique.uuid4(),
        'name': name,
        'age': random.choice([15, 16, 17, 18]),
        'gender': gender,
        'profile_img': getUserProfile(gender),
        'class_name': fake.random_element(elements=('10', '11', '12')),
        'address': fake.address(),
        'roll_no': fake.random_int(min=1, max=100),
        'date_of_addmission': fake.date_this_decade().isoformat(),
        'dob': fake.date_of_birth(minimum_age=15, maximum_age=18).isoformat(),
        'about': fake.text(),
        'fathers_name': fake.first_name_male() + ' ' + fake.last_name(),
        'mothers_name': fake.first_name_female() + ' ' + fake.last_name(),
        'phone_num': fake.phone_number(),
        'phone_num_alt': fake.phone_number(),
        'phone_gardian': fake.phone_number(),
        'isactive': fake.boolean(),
    }
    return student

def generate_students_batch(batch_size):
    return [generateStudent() for _ in range(batch_size)]

def write_student_to_file(students, file):
    with open(file, 'a') as f:
        f.write(','.join(json.dumps(student) for student in students) + ',')

def main(total_records, batch_size, file_name):
    with open(file_name, 'w') as f:
        f.write('[')

    start_time = time.time()

    num_batches = total_records // batch_size
    progress_interval = max(1, num_batches // 10)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(generate_students_batch, batch_size) for _ in range(num_batches)]

        for i, future in enumerate(concurrent.futures.as_completed(futures), 1):
            batch = future.result()
            write_student_to_file(batch, file_name)
            if i % progress_interval == 0 or i == num_batches:
                print(f"Progress: {i}/{num_batches} batches completed")

    # Remove the trailing comma and close the JSON array
    with open(file_name, 'rb+') as f:
        f.seek(-1, 2)  # Move the cursor to the second last byte
        f.truncate()   # Truncate the file to remove the last comma
        f.write(b']')  # Write the closing bracket

    end_time = time.time()
    print(f"Time taken: {end_time - start_time} seconds")

# Parameters
total_records = 50000
batch_size = 1000
file_name = 'students.json'

# Run the main function
main(total_records, batch_size, file_name)
