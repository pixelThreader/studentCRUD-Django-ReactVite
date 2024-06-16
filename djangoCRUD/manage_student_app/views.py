from django.http import JsonResponse

# Create your views here.


def addStudent(request):
    if request.method == 'POST':
        name = request.POST.get('name_student')
        age = request.POST.get('')
        profile_img = request.POST.get('')
        class_name = request.POST.get('')
        address = request.POST.get('')
        roll_no = request.POST.get('')
        date_of_addmission = request.POST.get('')
        dob = request.POST.get('')
        admission_no = request.POST.get('')
        about = request.POST.get('')
        fathers_name = request.POST.get('')
        mothers_name = request.POST.get('')
        phone_num = request.POST.get('')
        phone_num_alt = request.POST.get('')
        phone_gardian = request.POST.get('')
        isactive = request.POST.get('')