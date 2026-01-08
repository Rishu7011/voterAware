declare global {
  type SelectFieldProps = {
    placeholder?: string
    value?: number
    onChange?: (value: number) => void
  }

  type SourceCardProps = {
    icon?: keyof typeof MaterialIcons.glyphMap
    title: string
    subtitle: string
    href?: string
    uri?: string
  }

  type TimelineProps = {
    title: string
    desc: string
    icon: keyof typeof MaterialIcons.glyphMap
    isLast?: boolean
  }

  type SignUpData = {
    fullName: string;
    email: string;
    password: string;
  }
  type SignInData = {
    email: string;
    password: string;
  }
  type ApiResponse = {
    token?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      createdAt: string;
      updatedAt: string;
    };
    message?: string;
    error?: string;
  }


  type FactCheckResponse = {
    claims: Claim[];
    nextPageToken?: string;
  }


  type Claim = {
    text: string;
    claimant: string;
    claimDate: string;
    claimReview: ClaimReview[]
  }


  type ClaimReview = {
    publisher: {
      name: string;
      site: string;
    };
    url: string;
    title: string;
    textualRating: string;
    languageCode: string;
  }


  type VerdictType = "TRUE" | "FALSE" | "UNVERIFIED";


  type FactResult = {
    id: string;
    verdict: VerdictType;
    claim: string;
    explanation: string;
    source: string;
    url?: string;
    time: string;
  }

  // Chatbot 

  type Role = "user" | "assistant";

  type Message = {
    id: string;
    role: Role;
    text: string;
    time: string;
  }

  type IntentKey =
    | "REGISTER"
    | "CORRECTION"
    | "ADDRESS_CHANGE"
    | "HOW_TO_VOTE"
    | "POLLING_BOOTH"
    | "DOCUMENTS"
    | "EVM"
    | "FAKE_NEWS"
    | "MCC"
    | "FIRST_TIME"
    | "ONE_NATION"
    | "OVERSEAS"
    | "SENIOR"
    | "UNKNOWN";
  
}

export { }