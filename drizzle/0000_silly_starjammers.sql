-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `bank_accounts` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`bank` varchar(128),
	`agency` varchar(20),
	`accountNumber` varchar(20),
	`balance` float NOT NULL DEFAULT 0,
	`createdAt` datetime,
	`updatedAt` datetime,
	CONSTRAINT `bank_accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bank_transfers` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`sourceAccountId` int unsigned NOT NULL,
	`destinationAccountId` int unsigned NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`date` datetime NOT NULL,
	`createdAt` datetime,
	`updatedAt` datetime,
	CONSTRAINT `bank_transfers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `billing_protocols` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`value` float NOT NULL,
	`createdAt` datetime,
	`updatedAt` datetime,
	`BillingId` int unsigned,
	`ProtocolId` int unsigned,
	CONSTRAINT `billing_protocols_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `billings` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`status` varchar(50) DEFAULT 'pendente',
	`total_value` decimal(10,2) DEFAULT '0.00',
	`due_date` datetime,
	`payment_date` datetime,
	`method` enum('Pix','Boleto','Cartão','Transferência','Espécie') NOT NULL DEFAULT 'Boleto',
	`createdAt` datetime,
	`updatedAt` datetime,
	`BankAccountId` int unsigned,
	`ClientId` int unsigned,
	CONSTRAINT `billings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `checks` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`description` varchar(128) NOT NULL,
	`url` varchar(255) NOT NULL,
	`condition` varchar(255),
	`send_alert` tinyint(1) DEFAULT 0,
	`message` text NOT NULL,
	`verify_status` tinyint(1) DEFAULT 1,
	`path_return` varchar(255),
	`return` varchar(255),
	`status` enum('OK','Error') DEFAULT 'OK',
	`createdAt` datetime,
	`updatedAt` datetime,
	`ProjectId` int unsigned,
	CONSTRAINT `checks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`corporate_name` varchar(255),
	`document` varchar(15),
	`email` varchar(128),
	`due_day` int NOT NULL DEFAULT 20,
	`createdAt` datetime,
	`updatedAt` datetime,
	CONSTRAINT `clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`email` varchar(255),
	`number` varchar(255),
	`whatsapp` varchar(255),
	`createdAt` datetime,
	`updatedAt` datetime,
	`ClientId` int unsigned,
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cost_centers` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`description` varchar(255),
	`createdAt` datetime,
	`updatedAt` datetime,
	`ParentId` int unsigned,
	CONSTRAINT `cost_centers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `credentials` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`description` varchar(128) NOT NULL,
	`host` varchar(128) NOT NULL,
	`username` varchar(128) NOT NULL,
	`password` varchar(128) NOT NULL,
	`createdAt` datetime,
	`updatedAt` datetime,
	`ClientId` int unsigned,
	CONSTRAINT `credentials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `licenses` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`key` varchar(36) NOT NULL,
	`status` enum('Ativo','Inativo') DEFAULT 'Ativo',
	`createdAt` datetime,
	`updatedAt` datetime,
	`SubscriptionId` int unsigned,
	CONSTRAINT `licenses_id` PRIMARY KEY(`id`),
	CONSTRAINT `key` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `payables` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`description` varchar(255) NOT NULL,
	`value` decimal(10,2) NOT NULL,
	`dueDate` datetime NOT NULL,
	`paymentDate` datetime,
	`status` enum('pendente','pago','atrasado','cancelado') NOT NULL DEFAULT 'pendente',
	`createdAt` datetime,
	`updatedAt` datetime,
	`SupplierId` int unsigned,
	`BankAccountId` int unsigned,
	`CostCenterId` int unsigned,
	CONSTRAINT `payables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`description` varchar(255) NOT NULL,
	`value` float NOT NULL DEFAULT 0,
	`coust` float NOT NULL DEFAULT 0,
	`generate_license` tinyint(1) NOT NULL DEFAULT 0,
	`createdAt` datetime,
	`updatedAt` datetime,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`url` varchar(255),
	`fixed` tinyint(1) DEFAULT 0,
	`type` enum('API','Bot','WebSite','Automação','Crawler','Outros'),
	`createdAt` datetime,
	`updatedAt` datetime,
	`ServerId` int unsigned,
	`ClientId` int unsigned,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `protocol_products` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`charge_type` enum('Único','Mensal','Anual'),
	`value` float NOT NULL,
	`createdAt` datetime,
	`updatedAt` datetime,
	`ProductId` int unsigned,
	`LicenseId` int unsigned,
	`ProtocolId` int unsigned,
	CONSTRAINT `protocol_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `protocol_registers` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`description` varchar(255) NOT NULL,
	`value` float NOT NULL,
	`type` enum('Serviço','Despesa') NOT NULL,
	`createdAt` datetime,
	`updatedAt` datetime,
	`ProtocolId` int unsigned,
	CONSTRAINT `protocol_registers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `protocols` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`status` enum('Em aberto','Liberado para pagamento','Fechado','Cancelado') DEFAULT 'Em aberto',
	`notes` text,
	`closedAt` datetime,
	`createdAt` datetime,
	`updatedAt` datetime,
	`SubscriptionId` int unsigned,
	`ServiceOrderId` int unsigned,
	CONSTRAINT `protocols_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `receipts` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`method` enum('Pix','Boleto','Cartão','Transferência','Espécie') NOT NULL,
	`value` float NOT NULL,
	`note` varchar(255),
	`createdAt` datetime,
	`updatedAt` datetime,
	`BankAccountId` int unsigned,
	`ProtocolId` int unsigned,
	CONSTRAINT `receipts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `servers` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`description` varchar(255),
	`provider` varchar(128),
	`host` varchar(128),
	`username` varchar(128),
	`password` varchar(128),
	`rsa` text,
	`createdAt` datetime,
	`updatedAt` datetime,
	`ClientId` int unsigned,
	CONSTRAINT `servers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_orders` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`subject` varchar(128) NOT NULL,
	`description` varchar(255),
	`status` enum('Em avaliação','Orçamento enviado','Na fila','Em correções','Pendente','Finalizado','Cancelado') DEFAULT 'Em avaliação',
	`createdAt` datetime,
	`updatedAt` datetime,
	`ProjectId` int unsigned,
	`ClientId` int unsigned,
	CONSTRAINT `service_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subprojects` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`url` varchar(255) NOT NULL,
	`type` enum('Front-End','Back-End','Bot','Outros') NOT NULL,
	`createdAt` datetime,
	`updatedAt` datetime,
	`ProjectId` int unsigned,
	CONSTRAINT `subprojects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(55),
	`status` enum('Pendente','Pago','Não pago','Cancelado') DEFAULT 'Pago',
	`dueAt` datetime NOT NULL,
	`createdAt` datetime,
	`updatedAt` datetime,
	`ProjectId` int unsigned,
	`ClientId` int unsigned,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`cnpj` varchar(20),
	`email` varchar(128),
	`phone` varchar(20),
	`createdAt` datetime,
	`updatedAt` datetime,
	CONSTRAINT `suppliers_id` PRIMARY KEY(`id`),
	CONSTRAINT `cnpj` UNIQUE(`cnpj`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`username` varchar(128) NOT NULL,
	`password` varchar(128) NOT NULL,
	`createdAt` datetime,
	`updatedAt` datetime,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `username` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `bank_transfers` ADD CONSTRAINT `bank_transfers_ibfk_1` FOREIGN KEY (`sourceAccountId`) REFERENCES `bank_accounts`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `bank_transfers` ADD CONSTRAINT `bank_transfers_ibfk_2` FOREIGN KEY (`destinationAccountId`) REFERENCES `bank_accounts`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `billing_protocols` ADD CONSTRAINT `billing_protocols_ibfk_1` FOREIGN KEY (`BillingId`) REFERENCES `billings`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `billing_protocols` ADD CONSTRAINT `billing_protocols_ibfk_2` FOREIGN KEY (`ProtocolId`) REFERENCES `protocols`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `billings` ADD CONSTRAINT `billings_ibfk_1` FOREIGN KEY (`BankAccountId`) REFERENCES `bank_accounts`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `billings` ADD CONSTRAINT `billings_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `clients`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `checks` ADD CONSTRAINT `checks_ibfk_1` FOREIGN KEY (`ProjectId`) REFERENCES `projects`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `clients`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `cost_centers` ADD CONSTRAINT `cost_centers_ibfk_1` FOREIGN KEY (`ParentId`) REFERENCES `cost_centers`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `credentials` ADD CONSTRAINT `credentials_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `clients`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `licenses` ADD CONSTRAINT `licenses_ibfk_1` FOREIGN KEY (`SubscriptionId`) REFERENCES `subscriptions`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payables` ADD CONSTRAINT `payables_ibfk_1` FOREIGN KEY (`SupplierId`) REFERENCES `suppliers`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payables` ADD CONSTRAINT `payables_ibfk_2` FOREIGN KEY (`BankAccountId`) REFERENCES `bank_accounts`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payables` ADD CONSTRAINT `payables_ibfk_3` FOREIGN KEY (`CostCenterId`) REFERENCES `cost_centers`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`ServerId`) REFERENCES `servers`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `clients`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `protocol_products` ADD CONSTRAINT `protocol_products_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `protocol_products` ADD CONSTRAINT `protocol_products_ibfk_2` FOREIGN KEY (`LicenseId`) REFERENCES `licenses`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `protocol_products` ADD CONSTRAINT `protocol_products_ibfk_3` FOREIGN KEY (`ProtocolId`) REFERENCES `protocols`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `protocol_registers` ADD CONSTRAINT `protocol_registers_ibfk_1` FOREIGN KEY (`ProtocolId`) REFERENCES `protocols`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `protocols` ADD CONSTRAINT `protocols_ibfk_1` FOREIGN KEY (`SubscriptionId`) REFERENCES `subscriptions`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `protocols` ADD CONSTRAINT `protocols_ibfk_2` FOREIGN KEY (`ServiceOrderId`) REFERENCES `service_orders`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `receipts` ADD CONSTRAINT `receipts_ibfk_1` FOREIGN KEY (`BankAccountId`) REFERENCES `bank_accounts`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `receipts` ADD CONSTRAINT `receipts_ibfk_2` FOREIGN KEY (`ProtocolId`) REFERENCES `protocols`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `servers` ADD CONSTRAINT `servers_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `clients`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `service_orders` ADD CONSTRAINT `service_orders_ibfk_1` FOREIGN KEY (`ProjectId`) REFERENCES `projects`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `service_orders` ADD CONSTRAINT `service_orders_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `clients`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `subprojects` ADD CONSTRAINT `subprojects_ibfk_1` FOREIGN KEY (`ProjectId`) REFERENCES `projects`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`ProjectId`) REFERENCES `projects`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `clients`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `sourceAccountId` ON `bank_transfers` (`sourceAccountId`);--> statement-breakpoint
CREATE INDEX `destinationAccountId` ON `bank_transfers` (`destinationAccountId`);--> statement-breakpoint
CREATE INDEX `BillingId` ON `billing_protocols` (`BillingId`);--> statement-breakpoint
CREATE INDEX `ProtocolId` ON `billing_protocols` (`ProtocolId`);--> statement-breakpoint
CREATE INDEX `BankAccountId` ON `billings` (`BankAccountId`);--> statement-breakpoint
CREATE INDEX `ClientId` ON `billings` (`ClientId`);--> statement-breakpoint
CREATE INDEX `ProjectId` ON `checks` (`ProjectId`);--> statement-breakpoint
CREATE INDEX `ClientId` ON `contacts` (`ClientId`);--> statement-breakpoint
CREATE INDEX `ParentId` ON `cost_centers` (`ParentId`);--> statement-breakpoint
CREATE INDEX `ClientId` ON `credentials` (`ClientId`);--> statement-breakpoint
CREATE INDEX `SubscriptionId` ON `licenses` (`SubscriptionId`);--> statement-breakpoint
CREATE INDEX `SupplierId` ON `payables` (`SupplierId`);--> statement-breakpoint
CREATE INDEX `BankAccountId` ON `payables` (`BankAccountId`);--> statement-breakpoint
CREATE INDEX `CostCenterId` ON `payables` (`CostCenterId`);--> statement-breakpoint
CREATE INDEX `ServerId` ON `projects` (`ServerId`);--> statement-breakpoint
CREATE INDEX `ClientId` ON `projects` (`ClientId`);--> statement-breakpoint
CREATE INDEX `ProductId` ON `protocol_products` (`ProductId`);--> statement-breakpoint
CREATE INDEX `LicenseId` ON `protocol_products` (`LicenseId`);--> statement-breakpoint
CREATE INDEX `ProtocolId` ON `protocol_products` (`ProtocolId`);--> statement-breakpoint
CREATE INDEX `ProtocolId` ON `protocol_registers` (`ProtocolId`);--> statement-breakpoint
CREATE INDEX `SubscriptionId` ON `protocols` (`SubscriptionId`);--> statement-breakpoint
CREATE INDEX `ServiceOrderId` ON `protocols` (`ServiceOrderId`);--> statement-breakpoint
CREATE INDEX `BankAccountId` ON `receipts` (`BankAccountId`);--> statement-breakpoint
CREATE INDEX `ProtocolId` ON `receipts` (`ProtocolId`);--> statement-breakpoint
CREATE INDEX `ClientId` ON `servers` (`ClientId`);--> statement-breakpoint
CREATE INDEX `ProjectId` ON `service_orders` (`ProjectId`);--> statement-breakpoint
CREATE INDEX `ClientId` ON `service_orders` (`ClientId`);--> statement-breakpoint
CREATE INDEX `ProjectId` ON `subprojects` (`ProjectId`);--> statement-breakpoint
CREATE INDEX `ProjectId` ON `subscriptions` (`ProjectId`);--> statement-breakpoint
CREATE INDEX `ClientId` ON `subscriptions` (`ClientId`);
*/