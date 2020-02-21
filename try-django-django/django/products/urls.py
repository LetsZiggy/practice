from django.urls import path

from .views import (
	create_view,
	delete_view,
	detail_view,
	list_view,
	update_view,
)

app_name = "products"
urlpatterns = [
	# path("detail/", detail_view, name="detail"),
	path("detail/<int:identifier>/", detail_view, name="detail"),
	path("create/", create_view, name="create"),
	path("delete/<int:identifier>/", delete_view, name="delete"),
	path("list/", list_view, name="list"),
	path("update/<int:identifier>/", update_view, name="update"),
]
