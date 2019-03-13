USE [master]
GO
CREATE LOGIN [usr_app] WITH PASSWORD=N'usr_app', DEFAULT_DATABASE=[master], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO
if not exists(select top 1 1 from sysdatabses where name = 'DB1')
   BEGIN
      CREATE DATABASE [DB1]
   END
GO
if not exists(select top 1 1 from sysdatabses where name = 'DB2')
   BEGIN
      CREATE DATABASE [DB2]
   END
GO
USE [db1]
GO
if NOT exists(select top 1 1 from sysusers where name like 'usr_app')
	BEGIN
		CREATE USER [usr_app] FOR LOGIN [usr_app]
		ALTER ROLE [db_owner] ADD MEMBER [usr_app]
	END
ELSE
	BEGIN
		EXEC SP_CHANGE_USERS_LOGIN 'UPDATE_ONE','usr_app','usr_app';
	END
GO
USE MASTER
GO
if not exists(select top 1 1 from sysdatabses where name = 'DB_FATE_HOMOLOG')
   BEGIN
      CREATE DATABASE [DB_FATE_HOMOLOG]
   END
GO
USE [DB_FATE_HOMOLOG]
GO
if NOT exists(select top 1 1 from sysusers where name like 'usr_app')
	BEGIN
		CREATE USER [usr_app] FOR LOGIN [usr_app]
		ALTER ROLE [db_owner] ADD MEMBER [usr_app]
	END
ELSE
	BEGIN
		EXEC SP_CHANGE_USERS_LOGIN 'UPDATE_ONE','usr_app','usr_app';
	END
GO
