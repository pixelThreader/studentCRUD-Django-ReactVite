from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.http import JsonResponse
from .models import Student
from .serializers import StudentSerializer

# Create your views here.

@api_view(['POST'])
def addStudent(request):
    if request.method == 'POST':
        student_data = JSONParser().parse(request)
        student_serializer = StudentSerializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse({
                'student_status': student_serializer.data,
                'status': 'Success',
                'status_code': 200
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({
                'student_status': student_serializer.errors,
                'status': 'Bad Request',
                'status_code': 400
            }, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST', 'GET'])
def giveMeMyProfile(request, username):
    if request.method == 'GET':
        target_student = Student.objects.get(username = username)
        if target_student is not None:
            stu_tgt = StudentSerializer(target_student, many=True)
            return JsonResponse({
                'student_status': stu_tgt.data,
                'status': 'Success',
                'status_code': 200
            }, safe=False)
        else:
            return JsonResponse({
                'student_status': 'No student found in the DataBase',
                'status': 'Bad Request',
                'status_code': 400
            })

@api_view(['POST', 'GET'])
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
                'student_status': stu_tgt.data,
                'status': 'Success',
                'status_code': 200
            }, safe=False)
        else:
            return JsonResponse({
                'student_status': 'No student found in the DataBase',
                'status': 'Bad Request',
                'status_code': 400
            })

@api_view(['POST', 'GET'])
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
                'student_status': stu_tgt.data,
                'status': 'Success',
                'status_code': 200
            }, safe=False)
        else:
            return JsonResponse({
                'student_status': 'No student found in the DataBase',
                'status': 'Bad Request',
                'status_code': 400
            })