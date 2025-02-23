from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
# from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField  

# Extend User Model
class User(AbstractUser):
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)

    # Fix the group and permissions conflict
    groups = models.ManyToManyField(Group, related_name="blog_users", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="blog_users_permissions", blank=True)

# Category Model
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

# Blog Post Model
class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    content = RichTextUploadingField  ()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category)
    image = models.ImageField(upload_to="blog_images/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title

# Comment Model
class Comment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.post.title}"

# Like Model
class Like(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} likes {self.post.title}"
