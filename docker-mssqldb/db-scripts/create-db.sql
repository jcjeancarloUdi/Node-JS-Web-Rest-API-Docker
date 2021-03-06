USE [master]
GO

IF NOT EXISTS (
		SELECT TOP 1 1
		FROM master.dbo.syslogins
		WHERE NAME = 'usr_app'
		)
BEGIN
	CREATE LOGIN [usr_app]
		WITH PASSWORD = N'usr_app'
			,DEFAULT_DATABASE = [master]
			,CHECK_EXPIRATION = OFF
			,CHECK_POLICY = OFF
END
GO

IF NOT EXISTS (
		SELECT TOP 1 1
		FROM master.dbo.sysdatabases
		WHERE NAME = 'DB1'
		)
BEGIN
	CREATE DATABASE [DB1]
END
GO

IF NOT EXISTS (
		SELECT TOP 1 1
		FROM master.dbo.sysdatabases
		WHERE NAME = 'DB2'
		)
BEGIN
	CREATE DATABASE [DB2]
END
GO

USE [db1]
GO

IF NOT EXISTS (
		SELECT TOP 1 1
		FROM sysusers
		WHERE NAME LIKE 'usr_app'
		)
BEGIN
	CREATE USER [usr_app]
	FOR LOGIN [usr_app]

	ALTER ROLE [db_owner] ADD MEMBER [usr_app]
END
ELSE
BEGIN
	EXEC SP_CHANGE_USERS_LOGIN 'UPDATE_ONE'
		,'usr_app'
		,'usr_app';
END
GO

USE MASTER
GO

IF NOT EXISTS (
		SELECT TOP 1 1
		FROM master.dbo.sysdatabases
		WHERE NAME = 'DB_3'
		)
BEGIN
	CREATE DATABASE [DB_3]
END
GO

USE [DB_3]
GO

IF NOT EXISTS (
		SELECT TOP 1 1
		FROM sysusers
		WHERE NAME LIKE 'usr_app'
		)
BEGIN
	CREATE USER [usr_app]
	FOR LOGIN [usr_app]

	ALTER ROLE [db_owner] ADD MEMBER [usr_app]
END
ELSE
BEGIN
	EXEC SP_CHANGE_USERS_LOGIN 'UPDATE_ONE'
		,'usr_app'
		,'usr_app';
END
GO


