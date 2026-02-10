import { relations } from "drizzle-orm/relations";
import { bankAccounts, bankTransfers, billings, billingProtocols, protocols, clients, projects, checks, contacts, costCenters, credentials, subscriptions, licenses, suppliers, payables, servers, products, protocolProducts, protocolRegisters, serviceOrders, receipts, subprojects } from "./schema";

export const bankTransfersRelations = relations(bankTransfers, ({one}) => ({
	bankAccount_sourceAccountId: one(bankAccounts, {
		fields: [bankTransfers.sourceAccountId],
		references: [bankAccounts.id],
		relationName: "bankTransfers_sourceAccountId_bankAccounts_id"
	}),
	bankAccount_destinationAccountId: one(bankAccounts, {
		fields: [bankTransfers.destinationAccountId],
		references: [bankAccounts.id],
		relationName: "bankTransfers_destinationAccountId_bankAccounts_id"
	}),
}));

export const bankAccountsRelations = relations(bankAccounts, ({many}) => ({
	bankTransfers_sourceAccountId: many(bankTransfers, {
		relationName: "bankTransfers_sourceAccountId_bankAccounts_id"
	}),
	bankTransfers_destinationAccountId: many(bankTransfers, {
		relationName: "bankTransfers_destinationAccountId_bankAccounts_id"
	}),
	billings: many(billings),
	payables: many(payables),
	receipts: many(receipts),
}));

export const billingProtocolsRelations = relations(billingProtocols, ({one}) => ({
	billing: one(billings, {
		fields: [billingProtocols.billingId],
		references: [billings.id]
	}),
	protocol: one(protocols, {
		fields: [billingProtocols.protocolId],
		references: [protocols.id]
	}),
}));

export const billingsRelations = relations(billings, ({one, many}) => ({
	billingProtocols: many(billingProtocols),
	bankAccount: one(bankAccounts, {
		fields: [billings.bankAccountId],
		references: [bankAccounts.id]
	}),
	client: one(clients, {
		fields: [billings.clientId],
		references: [clients.id]
	}),
}));

export const protocolsRelations = relations(protocols, ({one, many}) => ({
	billingProtocols: many(billingProtocols),
	protocolProducts: many(protocolProducts),
	protocolRegisters: many(protocolRegisters),
	subscription: one(subscriptions, {
		fields: [protocols.subscriptionId],
		references: [subscriptions.id]
	}),
	serviceOrder: one(serviceOrders, {
		fields: [protocols.serviceOrderId],
		references: [serviceOrders.id]
	}),
	receipts: many(receipts),
}));

export const clientsRelations = relations(clients, ({many}) => ({
	billings: many(billings),
	contacts: many(contacts),
	credentials: many(credentials),
	projects: many(projects),
	servers: many(servers),
	serviceOrders: many(serviceOrders),
	subscriptions: many(subscriptions),
}));

export const checksRelations = relations(checks, ({one}) => ({
	project: one(projects, {
		fields: [checks.projectId],
		references: [projects.id]
	}),
}));

export const projectsRelations = relations(projects, ({one, many}) => ({
	checks: many(checks),
	server: one(servers, {
		fields: [projects.serverId],
		references: [servers.id]
	}),
	client: one(clients, {
		fields: [projects.clientId],
		references: [clients.id]
	}),
	serviceOrders: many(serviceOrders),
	subprojects: many(subprojects),
	subscriptions: many(subscriptions),
}));

export const contactsRelations = relations(contacts, ({one}) => ({
	client: one(clients, {
		fields: [contacts.clientId],
		references: [clients.id]
	}),
}));

export const costCentersRelations = relations(costCenters, ({one, many}) => ({
	costCenter: one(costCenters, {
		fields: [costCenters.parentId],
		references: [costCenters.id],
		relationName: "costCenters_parentId_costCenters_id"
	}),
	costCenters: many(costCenters, {
		relationName: "costCenters_parentId_costCenters_id"
	}),
	payables: many(payables),
}));

export const credentialsRelations = relations(credentials, ({one}) => ({
	client: one(clients, {
		fields: [credentials.clientId],
		references: [clients.id]
	}),
}));

export const licensesRelations = relations(licenses, ({one, many}) => ({
	subscription: one(subscriptions, {
		fields: [licenses.subscriptionId],
		references: [subscriptions.id]
	}),
	protocolProducts: many(protocolProducts),
}));

export const subscriptionsRelations = relations(subscriptions, ({one, many}) => ({
	licenses: many(licenses),
	protocols: many(protocols),
	project: one(projects, {
		fields: [subscriptions.projectId],
		references: [projects.id]
	}),
	client: one(clients, {
		fields: [subscriptions.clientId],
		references: [clients.id]
	}),
}));

export const payablesRelations = relations(payables, ({one}) => ({
	supplier: one(suppliers, {
		fields: [payables.supplierId],
		references: [suppliers.id]
	}),
	bankAccount: one(bankAccounts, {
		fields: [payables.bankAccountId],
		references: [bankAccounts.id]
	}),
	costCenter: one(costCenters, {
		fields: [payables.costCenterId],
		references: [costCenters.id]
	}),
}));

export const suppliersRelations = relations(suppliers, ({many}) => ({
	payables: many(payables),
}));

export const serversRelations = relations(servers, ({one, many}) => ({
	projects: many(projects),
	client: one(clients, {
		fields: [servers.clientId],
		references: [clients.id]
	}),
}));

export const protocolProductsRelations = relations(protocolProducts, ({one}) => ({
	product: one(products, {
		fields: [protocolProducts.productId],
		references: [products.id]
	}),
	license: one(licenses, {
		fields: [protocolProducts.licenseId],
		references: [licenses.id]
	}),
	protocol: one(protocols, {
		fields: [protocolProducts.protocolId],
		references: [protocols.id]
	}),
}));

export const productsRelations = relations(products, ({many}) => ({
	protocolProducts: many(protocolProducts),
}));

export const protocolRegistersRelations = relations(protocolRegisters, ({one}) => ({
	protocol: one(protocols, {
		fields: [protocolRegisters.protocolId],
		references: [protocols.id]
	}),
}));

export const serviceOrdersRelations = relations(serviceOrders, ({one, many}) => ({
	protocols: many(protocols),
	project: one(projects, {
		fields: [serviceOrders.projectId],
		references: [projects.id]
	}),
	client: one(clients, {
		fields: [serviceOrders.clientId],
		references: [clients.id]
	}),
}));

export const receiptsRelations = relations(receipts, ({one}) => ({
	bankAccount: one(bankAccounts, {
		fields: [receipts.bankAccountId],
		references: [bankAccounts.id]
	}),
	protocol: one(protocols, {
		fields: [receipts.protocolId],
		references: [protocols.id]
	}),
}));

export const subprojectsRelations = relations(subprojects, ({one}) => ({
	project: one(projects, {
		fields: [subprojects.projectId],
		references: [projects.id]
	}),
}));