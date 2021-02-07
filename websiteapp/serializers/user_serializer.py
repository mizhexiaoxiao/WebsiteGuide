from websiteapp.models import UserInfo
from rest_framework.serializers import ModelSerializer

class UserInfoSerializer(ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'

    def create(self, validated_data):
        user = UserInfo(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user