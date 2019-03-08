USE MASTER
go
IF EXISTS(SELECT TOP 1 1 FROM sysdatabases where name like 'db1')
begin

	IF NOT EXISTS(SELECT TOP 1 1 FROM db1.sys.tables where name like 'clientes')
		begin
			exec ('CREATE TABLE db1.dbo.Clientes(id INT NOT NULL, nome NVARCHAR(150), cpf VARCHAR(11), primary key (id))')
			print 'Tabela Clientes foi criada.'
		end
end