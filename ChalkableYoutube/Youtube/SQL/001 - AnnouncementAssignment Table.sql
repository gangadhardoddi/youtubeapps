Create Table AnnouncementAssignment
(
	DistrictId uniqueidentifier not null,
	AnnouncementApplicationId int not null,
	YoutubeId nvarchar(2048) not null,
	Constraint PK_AnnouncementAssignment Primary key (DistrictId, AnnouncementApplicationId)
)
GO
