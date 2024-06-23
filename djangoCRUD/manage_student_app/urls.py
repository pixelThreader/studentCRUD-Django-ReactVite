from django.urls import path
from . import views

urlpatterns = [
    path('get-students/', views.getStudent, name='getStudents_info'),
    path('create-student/', views.addStudent, name='add_student'),
    path('delete-student/', views.deleteMyProfile, name='add_student'),
    path('edit-student/', views.editMyProfile, name='add_student'),
    path('<str:username>/', views.giveMeMyProfile, name='add_student'),
]
