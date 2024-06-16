from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .serializers import StudentSerializer
from .models import Student

# Create your views here.

@csrf_exempt
def addStudent(request):
    if request.method == 'POST':
        student_data = JSONParser().parse(request)
        student_serializer = StudentSerializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
        name = request.POST.get('')
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
        is_active = request.POST.get('')

def giveMeMyProfile(request, username):
    if request.method == 'GET':
        target_student = Student.objects.get(username = username)
        if target_student is not None:
            stu_tgt = StudentSerializer(target_student, many=True)
            return JsonResponse({
                'student_deleted': stu_tgt.data,
                'status': 'Success',
                'status_code': 200
            }, safe=False)
        else:
            return JsonResponse({
                'student_deleted': 'No student found in the DataBase',
                'status': 'Bad Request',
                'status_code': 400
            })

def deleteMyProfile(request):
    if request.method == 'POST':
        stuaddno = request.POST.get('')
        stuname = request.POST.get('')
        stuclass_name = request.POST.get('')
        sturoll_no = request.POST.get('')
        studentDetail = Student.objects.filter(class_name = stuclass_name)
        studentDetail = studentDetail.filter(name=stuname).filter(roll_no=sturoll_no)
        target_student = studentDetail.get(admission_no=stuaddno)

        if target_student is not None:
            target_student.delete()
            stu_tgt = StudentSerializer(target_student, many=True)
            return JsonResponse({
                'student_deleted': stu_tgt.data,
                'status': 'Success',
                'status_code': 200
            }, safe=False)
        else:
            return JsonResponse({
                'student_deleted': 'No student found in the DataBase',
                'status': 'Bad Request',
                'status_code': 400
            })


def editMyProfile(request):
    if request.method == 'POST':
        stuaddno = request.POST.get('')
        stuname = request.POST.get('')
        stuclass_name = request.POST.get('')
        sturoll_no = request.POST.get('')
        studentDetail = Student.objects.filter(class_name = stuclass_name)
        studentDetail = studentDetail.filter(name=stuname).filter(roll_no=sturoll_no)
        target_student = studentDetail.get(admission_no=stuaddno)

        if target_student is not None:
            target_student.delete()
            stu_tgt = StudentSerializer(target_student, many=True)
            return JsonResponse({
                'student_deleted': stu_tgt.data,
                'status': 'Success',
                'status_code': 200
            }, safe=False)
        else:
            return JsonResponse({
                'student_deleted': 'No student found in the DataBase',
                'status': 'Bad Request',
                'status_code': 400
            })