﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.18444
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Youtube.Logic.Data
{
	using System.Data.Linq;
	using System.Data.Linq.Mapping;
	using System.Data;
	using System.Collections.Generic;
	using System.Reflection;
	using System.Linq;
	using System.Linq.Expressions;
	using System.ComponentModel;
	using System;
	
	
	[global::System.Data.Linq.Mapping.DatabaseAttribute(Name="youtube-dev")]
	public partial class DataModelDataContext : System.Data.Linq.DataContext
	{
		
		private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();
		
    #region Extensibility Method Definitions
    partial void OnCreated();
    partial void InsertAnnouncementAssignment(AnnouncementAssignment instance);
    partial void UpdateAnnouncementAssignment(AnnouncementAssignment instance);
    partial void DeleteAnnouncementAssignment(AnnouncementAssignment instance);
    #endregion
		
		public DataModelDataContext() : 
				base(global::System.Configuration.ConfigurationManager.ConnectionStrings["youtube_devConnectionString"].ConnectionString, mappingSource)
		{
			OnCreated();
		}
		
		public DataModelDataContext(string connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public DataModelDataContext(System.Data.IDbConnection connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public DataModelDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public DataModelDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public System.Data.Linq.Table<AnnouncementAssignment> AnnouncementAssignments
		{
			get
			{
				return this.GetTable<AnnouncementAssignment>();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.AnnouncementAssignment")]
	public partial class AnnouncementAssignment : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private System.Guid _DistrictId;
		
		private int _AnnouncementApplicationId;
		
		private string _YoutubeId;
		
    #region Extensibility Method Definitions
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OnDistrictIdChanging(System.Guid value);
    partial void OnDistrictIdChanged();
    partial void OnAnnouncementApplicationIdChanging(int value);
    partial void OnAnnouncementApplicationIdChanged();
    partial void OnYoutubeIdChanging(string value);
    partial void OnYoutubeIdChanged();
    #endregion
		
		public AnnouncementAssignment()
		{
			OnCreated();
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_DistrictId", DbType="UniqueIdentifier NOT NULL", IsPrimaryKey=true)]
		public System.Guid DistrictId
		{
			get
			{
				return this._DistrictId;
			}
			set
			{
				if ((this._DistrictId != value))
				{
					this.OnDistrictIdChanging(value);
					this.SendPropertyChanging();
					this._DistrictId = value;
					this.SendPropertyChanged("DistrictId");
					this.OnDistrictIdChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_AnnouncementApplicationId", DbType="Int NOT NULL", IsPrimaryKey=true)]
		public int AnnouncementApplicationId
		{
			get
			{
				return this._AnnouncementApplicationId;
			}
			set
			{
				if ((this._AnnouncementApplicationId != value))
				{
					this.OnAnnouncementApplicationIdChanging(value);
					this.SendPropertyChanging();
					this._AnnouncementApplicationId = value;
					this.SendPropertyChanged("AnnouncementApplicationId");
					this.OnAnnouncementApplicationIdChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_YoutubeId", DbType="NVarChar(2048) NOT NULL", CanBeNull=false)]
		public string YoutubeId
		{
			get
			{
				return this._YoutubeId;
			}
			set
			{
				if ((this._YoutubeId != value))
				{
					this.OnYoutubeIdChanging(value);
					this.SendPropertyChanging();
					this._YoutubeId = value;
					this.SendPropertyChanged("YoutubeId");
					this.OnYoutubeIdChanged();
				}
			}
		}
		
		public event PropertyChangingEventHandler PropertyChanging;
		
		public event PropertyChangedEventHandler PropertyChanged;
		
		protected virtual void SendPropertyChanging()
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, emptyChangingEventArgs);
			}
		}
		
		protected virtual void SendPropertyChanged(String propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}
	}
}
#pragma warning restore 1591
