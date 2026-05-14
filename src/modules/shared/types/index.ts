// ============================================================
// Shared Types — Marketplace Logístico Antigravity
// ============================================================

// ── API Response Wrappers ──────────────────────────────────

export interface IApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ── Auth ──────────────────────────────────────────────────

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: TUserRole;
  storeId?: number;
  active: boolean;
  createdAt: string;
}

export type TUserRole =
  | 'PROF-CLI-001' // Cliente Final
  | 'PROF-TIE-002' // Tienda Logística
  | 'PROF-SUP-003' // Superadmin
  | 'PROF-OPE-004' // Operador Interno
  | 'PROF-INS-005' // Inspector
  | 'PROF-TRP-006' // Transportista
  | 'PROF-AGA-007' // Agente Aduanal
  | 'PROF-AUD-008' // Auditor (solo lectura)

export const USER_ROLE_LABELS: Record<TUserRole, string> = {
  'PROF-CLI-001': 'Cliente Final',
  'PROF-TIE-002': 'Tienda Logística',
  'PROF-SUP-003': 'Superadmin',
  'PROF-OPE-004': 'Operador Interno',
  'PROF-INS-005': 'Inspector',
  'PROF-TRP-006': 'Transportista',
  'PROF-AGA-007': 'Agente Aduanal',
  'PROF-AUD-008': 'Auditor',
}

export interface IAuthTokens {
  accessToken: string;
  expiresIn: number;
}

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
  expiresIn: number;
}

// ── Catalogs ──────────────────────────────────────────────

export interface IPort {
  id: number;
  name: string;
  code: string;
  country: string;
  region: string;
  active: boolean;
}

export interface IServiceType {
  id: number;
  name: string;
  code: string;
  description: string;
  active: boolean;
}

export interface ICurrency {
  id: number;
  name: string;
  code: string; // ISO 4217
  symbol: string;
  active: boolean;
}

export interface ICountry {
  id: number;
  name: string;
  code: string; // ISO 3166-1
  active: boolean;
}

export interface IMeasurementUnit {
  id: number;
  name: string;
  abbreviation: string;
  category: string;
  active: boolean;
}

// ── Stores ────────────────────────────────────────────────

export type TStoreStatus = 'PENDING_APPROVAL' | 'ACTIVE' | 'REJECTED' | 'SUSPENDED'

export interface IStore {
  id: number;
  name: string;
  description: string;
  logoUrl?: string;
  coverUrl?: string;
  status: TStoreStatus;
  ratingAvg: number;
  ratingCount: number;
  ports: IPort[];
  serviceTypes: IServiceType[];
  priceFrom?: number;
  currency?: ICurrency;
  createdAt: string;
}

export interface IStoreService {
  id: number;
  storeId: number;
  name: string;
  description: string;
  serviceType: IServiceType;
  priceBase: number;
  currency: ICurrency;
  unit: IMeasurementUnit;
  slaResponseHours: number;
  slaDeliveryDays: number;
  conditions?: string;
  active: boolean;
}

// ── Search / Filters ──────────────────────────────────────

export interface ISearchFilters {
  query?: string;
  portIds?: number[];
  serviceTypeIds?: number[];
  countryIds?: number[];
  ratingMin?: number;
  priceMin?: number;
  priceMax?: number;
  verifiedOnly?: boolean;
  sortBy?: TStoreSortBy;
  page?: number;
  limit?: number;
}

export type TStoreSortBy = 'rating' | 'price_asc' | 'price_desc' | 'newest'

// ── Quotations ────────────────────────────────────────────

export type TQuotationStatus =
  | 'QUOTE_REQUESTED'
  | 'QUOTE_RESPONDED'
  | 'QUOTE_APPROVED'
  | 'QUOTE_REJECTED'
  | 'QUOTE_REVISION_REQUESTED'
  | 'QUOTE_EXPIRED'

export interface IQuotation {
  id: number;
  clientId: number;
  client?: IUser;
  storeId: number;
  store?: IStore;
  serviceId: number;
  service?: IStoreService;
  status: TQuotationStatus;
  description: string;
  quantity: number;
  portOriginId?: number;
  portOrigin?: IPort;
  portDestId?: number;
  portDest?: IPort;
  requiredDate?: string;
  documents?: IQuotationDocument[];
  response?: IQuotationResponse;
  createdAt: string;
  updatedAt: string;
}

export interface IQuotationResponse {
  id: number;
  quotationId: number;
  totalPrice: number;
  currencyId: number;
  currency: ICurrency;
  breakdown: string;
  conditions?: string;
  validUntil: string;
}

export interface IQuotationDocument {
  id: number;
  quotationId: number;
  fileUrl: string;
  uploadedBy: number;
  type: 'CLIENT' | 'STORE';
}

// ── Orders ────────────────────────────────────────────────

export type TOrderStatus =
  | 'ORDER_CREATED'
  | 'ORDER_CONFIRMED'
  | 'IN_PROGRESS'
  | 'PAYMENT_SUBMITTED'
  | 'PAYMENT_CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'

export interface IOrder {
  id: number;
  quotationId: number;
  clientId: number;
  client?: IUser;
  storeId: number;
  store?: IStore;
  serviceId: number;
  service?: IStoreService;
  status: TOrderStatus;
  totalAmount: number;
  currency: ICurrency;
  events?: IOrderEvent[];
  payments?: IPayment[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderEvent {
  id: number;
  orderId: number;
  eventType: string;
  description: string;
  userId: number;
  user?: IUser;
  createdAt: string;
}

// ── Payments ──────────────────────────────────────────────

export type TPaymentStatus =
  | 'PAYMENT_PENDING_VALIDATION'
  | 'PAYMENT_VALIDATED'
  | 'PAYMENT_REJECTED'

export interface IPayment {
  id: number;
  orderId: number;
  amount: number;
  currency: ICurrency;
  method: string;
  reference: string;
  receiptUrl: string;
  status: TPaymentStatus;
  validatedBy?: number;
  validatedAt?: string;
  createdAt: string;
}

// ── UI Utilities ──────────────────────────────────────────

export type TViewMode = 'grid' | 'list'

export interface IBreadcrumbItem {
  label: string;
  href?: string;
}
