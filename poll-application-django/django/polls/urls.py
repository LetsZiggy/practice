from django.urls import path

from .views import (
	DetailView,
	IndexView,
	ResultsView,
	# detail,
	# index,
	# results,
	vote,
)

app_name = "polls"
urlpatterns = [
	# FBV
	# path("", index, name="index"),
	# path("<int:question_id>/", detail, name="detail"),
	# path("<int:question_id>/results/", results, name="results"),
	path("<int:question_id>/vote/", vote, name="vote"),
	# CBV
	path("", IndexView.as_view(), name="index"),
	path("<int:pk>/", DetailView.as_view(), name="detail"),
	path("<int:pk>/results/", ResultsView.as_view(), name="results"),
]
