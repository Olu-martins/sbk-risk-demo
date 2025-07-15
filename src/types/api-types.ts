export interface ResponseResult<T> {
  data: T;
  message: string;
  statusCode: number;
  type: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SendOtpRequest {
  email: string;
  name: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}
export interface ResetPasswordRequest {
  password: string;
  token: string;
}

export interface ResendVerificationEmailRequest {
  email: string;
  f: string;
}

export interface MfaResponse {
  requiresMFA: boolean;
  tempToken: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  email: string;
  fullName: string;
  organizationId: string;
  phone: string;
  role: string;
  id: string;
  requiresMFA: boolean;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  businessName: string;
  password: string;
}

export interface RegisterResponse {
  userId: string;
  mfa: {
    qrCode: string;
    secret: string;
  };
  token: string;
}

export interface CompleteMfaRequest {
  token: string;
  code: string;
}

export interface VerifyMfaRequest {
  mfaToken: string;
  tempToken: string;
}

export enum QuestionType {
  SINGLE_CHOICE = "single_choice",
  MULTIPLE_CHOICE = "multiple_choice",
  BOOLEAN_WITH_MULTIPLE_CHOICE = "boolean_with_multiple_choice",
  MULTIPLE_CHOICE_WITH_INPUT = "multiple_choice_with_input",
  SINGLE_CHOICE_WITH_INPUT = "single_choice_with_input",
}

export interface BusinessContextQuestionDto {
  section: string;
  key: string;
  question: string;
  questionType: QuestionType;
  options: string[];
  booleanTypeInstructions?: string;
}

export interface FetchBusinessContextQuestionsResponse {
  questions: BusinessContextQuestionDto[];
}

export interface BusinessContextKeys {
  "Overview.data_handling": string;
  "Overview.system_access": string;
  "Overview.security_concerns": string;
  "Overview.customer_expectations": string;
  "Overview.security_incidents": string;
  "Overview.business_priorities": string;
  "Overview.cybersecurity_importance": string;
  "Overview.breach_impact": string;
  "Internal.key_stakeholders": string;
  "Internal.defined_roles": string;
  "Internal.security_training": string;
  "External.applicable_regulations": string;
  "External.third_party_partners": string;
  "External.compliance_monitoring": string;
  "Scope_ISMS.security_controls": string;
  "Scope_ISMS.excluded_areas": string;
}

export interface IBusinessContext {
  context: BusinessContextKeys;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface AssetsInventoryQuestionDto {
  section: string;
  key: string;
  question: string;
  questionType: QuestionType;
  options: string[];
  booleanTypeInstructions?: string;
}

export interface FetchAssetsInventoryQuestionsResponse {
  questions: AssetsInventoryQuestionDto[];
}

export interface AssetsInventoryKeys {
  "Software.licenses": string;
  "Software.usage": string;
  "Engineering.platforms": string;
  "Engineering.tools": string;
  "Databases.types": string;
  "Databases.access": string;
  "Financial.platforms": string;
  "Financial.data": string;
  "CustomerService.channels": string;
  "CustomerService.data": string;
  "ITInfrastructure.assets": string;
  "ITInfrastructure.security": string;
  "Legal.documents": string;
  "Legal.compliance": string;
  "OtherPlatforms.details": string;
}

export interface IAssetsInventory {
  context: AssetsInventoryKeys;
  createdAt: string;
  id: string;
  updatedAt: string;
}