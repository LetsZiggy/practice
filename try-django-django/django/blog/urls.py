from django.urls import path

from .views import (
	# create_view,
	# delete_view,
	# detail_view,
	# list_view,
	# update_view,
	ArticleCreateView,
	ArticleDeleteView,
	ArticleDetailView,
	ArticleListView,
	ArticleUpdateView,
)

app_name = "blog"
urlpatterns = [
	### Function based views ###
	# path("list/", list_view, name="list"),
	# path("detail/<int:identifier>/", detail_view, name="detail"),
	# path("create/", create_view, name="create"),
	# path("update/<int:identifier>/", update_view, name="update"),
	# path("delete/<int:identifier>/", delete_view, name="delete"),
	### Class based views ###
	path("list/", ArticleListView.as_view(), name="list"),
	path("detail/<int:identifier>/", ArticleDetailView.as_view(), name="detail"),
	path("create/", ArticleCreateView.as_view(), name="create"),
	path("update/<int:identifier>/", ArticleUpdateView.as_view(), name="update"),
	path("delete/<int:identifier>/", ArticleDeleteView.as_view(), name="delete"),
]
