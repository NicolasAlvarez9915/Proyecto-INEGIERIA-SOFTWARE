Use[DESB]

insert into Usuarios (Correo, IdPersona, Contraseña, Rol) values('admin@admin.com','1120754742',123, 'Administrador')
insert into Administradores (Identificacion, Nombres,Apellidos, Telefono,Whatsapp, Puesto ) values('1120754742','Nicolas', 'Alvarez', '333333', '3333', 'Gerente')


insert into Clientes (Identificacion, Nombres,Apellidos, Telefono,Whatsapp, Direccion, Horaio, TipoCliente ) values('1120754743','Naac', 'Alvarez', '333333', '3333', '1111', '1111', 'Tiene negocio')

select * from Vehiculos

delete Pedidos;
delete DetalleDePedidos;
delete Descuentos;
delete Productos;



DROP TABLE [dbo].[Descuentos]
GO
DROP TABLE [dbo].[Clientes]
GO
DROP TABLE [dbo].[Productos]
GO
DROP TABLE [dbo].[Usuarios]
GO
DROP TABLE [dbo].[Administradores]
GO
DROP TABLE [dbo].[DetalleDePedidos]
GO
DROP TABLE [dbo].[Pedidos]
GO
DROP TABLE [dbo].[ImagenProductos]
GO
DROP TABLE [dbo].[Vehiculos]
GO
DROP TABLE [dbo].[Domiciliarios]
GO


ALTER TABLE dbo.Domiciliarios  
DROP CONSTRAINT FK_Domiciliarios_Vehiculos_MotoPlaca;   
GO  




SELECT TOP (1000) [Identificacion]
      ,[Nombres]
      ,[Apellidos]
      ,[Telefono]
      ,[Whatsapp]
      ,[Direccion]
      ,[Horaio]
      ,[TipoCliente]
  FROM [DESB].[dbo].[Clientes]

  SELECT TOP (1000) [Identificacion]
      ,[Nombres]
      ,[Apellidos]
      ,[Telefono]
      ,[Whatsapp]
      ,[Puesto]
  FROM [DESB].[dbo].[Administradores]

  SELECT TOP (1000) [Codigo]
      ,[Categoria]
      ,[Nombre]
      ,[Cantidad]
      ,[Descripcion]
  FROM [DESB].[dbo].[Productos]

  SELECT TOP (1000) [Correo]
      ,[IdPersona]
      ,[Contraseña]
      ,[Rol]
  FROM [DESB].[dbo].[Usuarios]