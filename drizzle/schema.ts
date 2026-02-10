import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  primaryKey,
  int,
  varchar,
  float,
  datetime,
  index,
  foreignKey,
  decimal,
  mysqlEnum,
  text,
  unique,
  tinyint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const bankAccounts = mysqlTable(
  "bank_accounts",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    name: varchar({ length: 128 }).notNull(),
    bank: varchar({ length: 128 }),
    agency: varchar({ length: 20 }),
    accountNumber: varchar({ length: 20 }),
    balance: float().notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
  },
  (table) => [primaryKey({ columns: [table.id], name: "bank_accounts_id" })],
);

export const bankTransfers = mysqlTable(
  "bank_transfers",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    sourceAccountId: int({ unsigned: true })
      .notNull()
      .references(() => bankAccounts.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    destinationAccountId: int({ unsigned: true })
      .notNull()
      .references(() => bankAccounts.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    amount: decimal({ precision: 10, scale: 2 }).notNull(),
    date: datetime({ mode: "string" }).notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
  },
  (table) => [
    index("sourceAccountId").on(table.sourceAccountId),
    index("destinationAccountId").on(table.destinationAccountId),
    primaryKey({ columns: [table.id], name: "bank_transfers_id" }),
  ],
);

export const billingProtocols = mysqlTable(
  "billing_protocols",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    value: float().notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    billingId: int("BillingId", { unsigned: true }).references(
      () => billings.id,
      { onDelete: "cascade", onUpdate: "cascade" },
    ),
    protocolId: int("ProtocolId", { unsigned: true }).references(
      () => protocols.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
  },
  (table) => [
    index("BillingId").on(table.billingId),
    index("ProtocolId").on(table.protocolId),
    primaryKey({ columns: [table.id], name: "billing_protocols_id" }),
  ],
);

export const billings = mysqlTable(
  "billings",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    status: varchar({ length: 50 }).default("pendente"),
    totalValue: decimal("total_value", { precision: 10, scale: 2 }).default(
      "0.00",
    ),
    dueDate: datetime("due_date", { mode: "string" }),
    paymentDate: datetime("payment_date", { mode: "string" }),
    method: mysqlEnum(["Pix", "Boleto", "Cartão", "Transferência", "Espécie"])
      .default("Boleto")
      .notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    bankAccountId: int("BankAccountId", { unsigned: true }).references(
      () => bankAccounts.id,
      { onDelete: "set null", onUpdate: "cascade" },
    ),
    clientId: int("ClientId", { unsigned: true }).references(() => clients.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    index("BankAccountId").on(table.bankAccountId),
    index("ClientId").on(table.clientId),
    primaryKey({ columns: [table.id], name: "billings_id" }),
  ],
);

export const checks = mysqlTable(
  "checks",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    description: varchar({ length: 128 }).notNull(),
    url: varchar({ length: 255 }).notNull(),
    condition: varchar({ length: 255 }),
    sendAlert: tinyint("send_alert").default(0),
    message: text().notNull(),
    verifyStatus: tinyint("verify_status").default(1),
    pathReturn: varchar("path_return", { length: 255 }),
    return: varchar({ length: 255 }),
    status: mysqlEnum(["OK", "Error"]).default("OK"),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    projectId: int("ProjectId", { unsigned: true }).references(
      () => projects.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
  },
  (table) => [
    index("ProjectId").on(table.projectId),
    primaryKey({ columns: [table.id], name: "checks_id" }),
  ],
);

export const clients = mysqlTable(
  "clients",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    name: varchar({ length: 128 }).notNull(),
    corporateName: varchar("corporate_name", { length: 255 }),
    document: varchar({ length: 15 }),
    email: varchar({ length: 128 }),
    dueDay: int("due_day").default(20).notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
  },
  (table) => [primaryKey({ columns: [table.id], name: "clients_id" })],
);

export const contacts = mysqlTable(
  "contacts",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    name: varchar({ length: 128 }).notNull(),
    email: varchar({ length: 255 }),
    number: varchar({ length: 255 }),
    whatsapp: varchar({ length: 255 }),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    clientId: int("ClientId", { unsigned: true }).references(() => clients.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    index("ClientId").on(table.clientId),
    primaryKey({ columns: [table.id], name: "contacts_id" }),
  ],
);

export const costCenters = mysqlTable(
  "cost_centers",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    name: varchar({ length: 128 }).notNull(),
    description: varchar({ length: 255 }),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    parentId: int("ParentId", { unsigned: true }),
  },
  (table) => [
    index("ParentId").on(table.parentId),
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: "cost_centers_ibfk_1",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    primaryKey({ columns: [table.id], name: "cost_centers_id" }),
  ],
);

export const credentials = mysqlTable(
  "credentials",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    description: varchar({ length: 128 }).notNull(),
    host: varchar({ length: 128 }).notNull(),
    username: varchar({ length: 128 }).notNull(),
    password: varchar({ length: 128 }).notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    clientId: int("ClientId", { unsigned: true }).references(() => clients.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    index("ClientId").on(table.clientId),
    primaryKey({ columns: [table.id], name: "credentials_id" }),
  ],
);

export const licenses = mysqlTable(
  "licenses",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    key: varchar({ length: 36 }).notNull(),
    status: mysqlEnum(["Ativo", "Inativo"]).default("Ativo"),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    subscriptionId: int("SubscriptionId", { unsigned: true }).references(
      () => subscriptions.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
  },
  (table) => [
    index("SubscriptionId").on(table.subscriptionId),
    primaryKey({ columns: [table.id], name: "licenses_id" }),
    unique("key").on(table.key),
  ],
);

export const payables = mysqlTable(
  "payables",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    description: varchar({ length: 255 }).notNull(),
    value: decimal({ precision: 10, scale: 2 }).notNull(),
    dueDate: datetime({ mode: "string" }).notNull(),
    paymentDate: datetime({ mode: "string" }),
    status: mysqlEnum(["pendente", "pago", "atrasado", "cancelado"])
      .default("pendente")
      .notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    supplierId: int("SupplierId", { unsigned: true }).references(
      () => suppliers.id,
      { onDelete: "set null", onUpdate: "cascade" },
    ),
    bankAccountId: int("BankAccountId", { unsigned: true }).references(
      () => bankAccounts.id,
      { onDelete: "set null", onUpdate: "cascade" },
    ),
    costCenterId: int("CostCenterId", { unsigned: true }).references(
      () => costCenters.id,
      { onDelete: "set null", onUpdate: "cascade" },
    ),
  },
  (table) => [
    index("SupplierId").on(table.supplierId),
    index("BankAccountId").on(table.bankAccountId),
    index("CostCenterId").on(table.costCenterId),
    primaryKey({ columns: [table.id], name: "payables_id" }),
  ],
);

export const products = mysqlTable(
  "products",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    description: varchar({ length: 255 }).notNull(),
    value: float().notNull(),
    coust: float().notNull(),
    generateLicense: tinyint("generate_license").default(0).notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
  },
  (table) => [primaryKey({ columns: [table.id], name: "products_id" })],
);

export const projects = mysqlTable(
  "projects",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    name: varchar({ length: 128 }).notNull(),
    url: varchar({ length: 255 }),
    fixed: tinyint().default(0),
    type: mysqlEnum([
      "API",
      "Bot",
      "WebSite",
      "Automação",
      "Crawler",
      "Outros",
    ]),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    serverId: int("ServerId", { unsigned: true }).references(() => servers.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
    clientId: int("ClientId", { unsigned: true }).references(() => clients.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    index("ServerId").on(table.serverId),
    index("ClientId").on(table.clientId),
    primaryKey({ columns: [table.id], name: "projects_id" }),
  ],
);

export const protocolProducts = mysqlTable(
  "protocol_products",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    chargeType: mysqlEnum("charge_type", ["Único", "Mensal", "Anual"]),
    value: float().notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    productId: int("ProductId", { unsigned: true }).references(
      () => products.id,
      { onDelete: "set null", onUpdate: "cascade" },
    ),
    licenseId: int("LicenseId", { unsigned: true }).references(
      () => licenses.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
    protocolId: int("ProtocolId", { unsigned: true }).references(
      () => protocols.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
  },
  (table) => [
    index("ProductId").on(table.productId),
    index("LicenseId").on(table.licenseId),
    index("ProtocolId").on(table.protocolId),
    primaryKey({ columns: [table.id], name: "protocol_products_id" }),
  ],
);

export const protocolRegisters = mysqlTable(
  "protocol_registers",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    description: varchar({ length: 255 }).notNull(),
    value: float().notNull(),
    type: mysqlEnum(["Serviço", "Despesa"]).notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    protocolId: int("ProtocolId", { unsigned: true }).references(
      () => protocols.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
  },
  (table) => [
    index("ProtocolId").on(table.protocolId),
    primaryKey({ columns: [table.id], name: "protocol_registers_id" }),
  ],
);

export const protocols = mysqlTable(
  "protocols",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    status: mysqlEnum([
      "Em aberto",
      "Liberado para pagamento",
      "Fechado",
      "Cancelado",
    ]).default("Em aberto"),
    notes: text(),
    closedAt: datetime({ mode: "string" }),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    subscriptionId: int("SubscriptionId", { unsigned: true }).references(
      () => subscriptions.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
    serviceOrderId: int("ServiceOrderId", { unsigned: true }).references(
      () => serviceOrders.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
  },
  (table) => [
    index("SubscriptionId").on(table.subscriptionId),
    index("ServiceOrderId").on(table.serviceOrderId),
    primaryKey({ columns: [table.id], name: "protocols_id" }),
  ],
);

export const receipts = mysqlTable(
  "receipts",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    method: mysqlEnum([
      "Pix",
      "Boleto",
      "Cartão",
      "Transferência",
      "Espécie",
    ]).notNull(),
    value: float().notNull(),
    note: varchar({ length: 255 }),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    bankAccountId: int("BankAccountId", { unsigned: true }).references(
      () => bankAccounts.id,
      { onDelete: "set null", onUpdate: "cascade" },
    ),
    protocolId: int("ProtocolId", { unsigned: true }).references(
      () => protocols.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
  },
  (table) => [
    index("BankAccountId").on(table.bankAccountId),
    index("ProtocolId").on(table.protocolId),
    primaryKey({ columns: [table.id], name: "receipts_id" }),
  ],
);

export const servers = mysqlTable(
  "servers",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    description: varchar({ length: 255 }),
    provider: varchar({ length: 128 }),
    host: varchar({ length: 128 }),
    username: varchar({ length: 128 }),
    password: varchar({ length: 128 }),
    rsa: text(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    clientId: int("ClientId", { unsigned: true }).references(() => clients.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    index("ClientId").on(table.clientId),
    primaryKey({ columns: [table.id], name: "servers_id" }),
  ],
);

export const serviceOrders = mysqlTable(
  "service_orders",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    subject: varchar({ length: 128 }).notNull(),
    description: varchar({ length: 255 }),
    status: mysqlEnum([
      "Em avaliação",
      "Orçamento enviado",
      "Na fila",
      "Em correções",
      "Pendente",
      "Finalizado",
      "Cancelado",
    ]).default("Em avaliação"),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    projectId: int("ProjectId", { unsigned: true }).references(
      () => projects.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
    clientId: int("ClientId", { unsigned: true }).references(() => clients.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    index("ProjectId").on(table.projectId),
    index("ClientId").on(table.clientId),
    primaryKey({ columns: [table.id], name: "service_orders_id" }),
  ],
);

export const subprojects = mysqlTable(
  "subprojects",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    name: varchar({ length: 128 }).notNull(),
    url: varchar({ length: 255 }).notNull(),
    type: mysqlEnum(["Front-End", "Back-End", "Bot", "Outros"]).notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    projectId: int("ProjectId", { unsigned: true }).references(
      () => projects.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
  },
  (table) => [
    index("ProjectId").on(table.projectId),
    primaryKey({ columns: [table.id], name: "subprojects_id" }),
  ],
);

export const subscriptions = mysqlTable(
  "subscriptions",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    name: varchar({ length: 55 }),
    status: mysqlEnum(["Pendente", "Pago", "Não pago", "Cancelado"]).default(
      "Pago",
    ),
    dueAt: datetime({ mode: "string" }).notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
    projectId: int("ProjectId", { unsigned: true }).references(
      () => projects.id,
      { onDelete: "restrict", onUpdate: "cascade" },
    ),
    clientId: int("ClientId", { unsigned: true }).references(() => clients.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    index("ProjectId").on(table.projectId),
    index("ClientId").on(table.clientId),
    primaryKey({ columns: [table.id], name: "subscriptions_id" }),
  ],
);

export const suppliers = mysqlTable(
  "suppliers",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    name: varchar({ length: 128 }).notNull(),
    cnpj: varchar({ length: 20 }),
    email: varchar({ length: 128 }),
    phone: varchar({ length: 20 }),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
  },
  (table) => [
    primaryKey({ columns: [table.id], name: "suppliers_id" }),
    unique("cnpj").on(table.cnpj),
  ],
);

export const users = mysqlTable(
  "users",
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    username: varchar({ length: 128 }).notNull(),
    password: varchar({ length: 128 }).notNull(),
    createdAt: datetime({ mode: "string" }),
    updatedAt: datetime({ mode: "string" }),
  },
  (table) => [
    primaryKey({ columns: [table.id], name: "users_id" }),
    unique("username").on(table.username),
  ],
);
