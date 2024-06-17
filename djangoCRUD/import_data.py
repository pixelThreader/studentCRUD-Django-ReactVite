import os
import django
import json
from datetime import datetime

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoCRUD.settings')
django.setup()

from manage_student_app.models import Student

def import_students(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)
        for item in data:
            student = Student(
                user=item['user'],
                sno=item['sno'],
                admission_no=item['admission_no'],
                name=item['name'],
                age=item['age'],
                gender=item['gender'],
                profile_img=item['profile_img'],
                class_name=item['class_name'],
                address=item['address'],
                roll_no=item['roll_no'],
                date_of_addmission=datetime.fromisoformat(item['date_of_addmission']).date(),
                dob=datetime.fromisoformat(item['dob']).date(),
                about=item['about'],
                fathers_name=item['fathers_name'],
                mothers_name=item['mothers_name'],
                phone_num=item['phone_num'],
                phone_num_alt=item['phone_num_alt'],
                phone_gardian=item['phone_gardian'],
                isactive=item['is_active'],
            )
            student.save()
    print('Successfully imported data')

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='Import students from JSON file into Django.')
    parser.add_argument('json_file', type=str, help='The JSON file to load data from')
    
    args = parser.parse_args()
    
    import_students(args.json_file)
