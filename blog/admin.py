from django.contrib import admin
from .models import User, BlogPost, Category, Comment, Like

admin.site.register(User)
admin.site.register(BlogPost)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Like)
