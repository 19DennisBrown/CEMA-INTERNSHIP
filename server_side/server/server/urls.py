
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('user/', include('userAuth.urls')), #authentication
    path('docProfile/', include('doctor.urls')), #doctor profile
]
