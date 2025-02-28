from rest_framework import generics, permissions
from .models import BlogPost, Category, Comment, Like
from .serializers import BlogPostSerializer, CategorySerializer, CommentSerializer, LikeSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

User = get_user_model()

class BlogPostListCreate(generics.ListCreateAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]

class BlogPostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LikeCreate(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]




class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class DashboardStats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetching counts of posts, active users, and categories
        posts_count = BlogPost.objects.count()
        active_users_count = User.objects.filter(is_active=True).count()
        categories_count = Category.objects.count()

        # Return the data as a JSON response
        data = {
            "postsCount": posts_count,
            "activeUsersCount": active_users_count,
            "categoriesCount": categories_count,
        }
        return Response(data)
    
@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"user": {"username": user.username}, "token": token.key})
    else:
        return Response({"error": "Invalid credentials"}, status=400)