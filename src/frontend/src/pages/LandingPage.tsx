import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  BarChart2,
  Bell,
  Eye,
  EyeOff,
  Mail,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

// Aurora gradient background — no grid, no blocks
function GridBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Deep base */}
      <div className="absolute inset-0 bg-background" />

      {/* Large aurora blobs */}
      <div
        className="absolute -top-48 left-1/3 w-[700px] h-[700px] rounded-full blur-[160px]"
        style={{
          background: "oklch(0.72 0.19 210 / 0.15)",
          willChange: "auto",
        }}
      />
      <div
        className="absolute top-1/4 -right-48 w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{
          background: "oklch(0.65 0.22 245 / 0.12)",
          willChange: "auto",
        }}
      />
      <div
        className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full blur-[130px]"
        style={{ background: "oklch(0.62 0.2 295 / 0.10)", willChange: "auto" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-[420px] h-[420px] rounded-full blur-[120px]"
        style={{
          background: "oklch(0.68 0.18 155 / 0.08)",
          willChange: "auto",
        }}
      />
      <div
        className="absolute top-2/3 right-1/4 w-[350px] h-[350px] rounded-full blur-[110px]"
        style={{
          background: "oklch(0.74 0.17 185 / 0.07)",
          willChange: "auto",
        }}
      />
      <div
        className="absolute -top-20 right-1/3 w-[300px] h-[300px] rounded-full blur-[100px]"
        style={{
          background: "oklch(0.70 0.21 230 / 0.09)",
          willChange: "auto",
        }}
      />

      {/* Chart decorative lines */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="0,250 120,200 240,220 360,140 480,180 600,100 720,130 840,80 960,120 1080,60 1200,90 1320,40 1440,70"
          fill="none"
          stroke="oklch(0.72 0.19 210)"
          strokeWidth="2"
          className="pulse-line"
        />
        <polyline
          points="0,270 120,240 240,260 360,200 480,230 600,170 720,200 840,160 960,190 1080,140 1200,170 1320,120 1440,150"
          fill="none"
          stroke="oklch(0.65 0.22 245)"
          strokeWidth="1.5"
          style={{ animationDelay: "1s" }}
          className="pulse-line"
        />
      </svg>
    </div>
  );
}

const features = [
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    desc: "Track shifts across Tech, Finance, Health, Energy, and Crypto.",
  },
  {
    icon: Zap,
    title: "Weekly Digest",
    desc: "Curated updates delivered to your feed every week.",
  },
  {
    icon: BarChart2,
    title: "Category Filters",
    desc: "Follow only the sectors that matter to your portfolio.",
  },
  {
    icon: Shield,
    title: "Verified Sources",
    desc: "Every update reviewed before publishing to the feed.",
  },
];

function Divider() {
  return (
    <div className="relative my-5">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border/50" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="px-3 bg-card text-muted-foreground">or</span>
      </div>
    </div>
  );
}

/** Mask email: first 3 chars + *** + @domain */
function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 3);
  return `${visible}***@${domain}`;
}

const RESEND_COOLDOWN = 30;

function OTPScreen({
  email,
  onVerify,
  onBack,
  onResend,
}: {
  email: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  onResend: (email: string) => void;
}) {
  const [otpValue, setOtpValue] = useState("");
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start countdown on mount
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function handleResend() {
    onResend(email);
    setOtpValue("");
    setResendTimer(RESEND_COOLDOWN);
    // restart timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  return (
    <motion.div
      key="otp-screen"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Icon + heading */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center mb-3">
          <Mail size={24} className="text-primary" />
        </div>
        <h2 className="font-display font-bold text-foreground text-xl tracking-tight">
          Verify your email
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold text-foreground">
            {maskEmail(email)}
          </span>
        </p>
      </div>

      {/* OTP Input */}
      <div className="flex justify-center" data-ocid="otp.input">
        <InputOTP
          maxLength={6}
          value={otpValue}
          onChange={setOtpValue}
          autoFocus
        >
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className="h-11 w-11 text-base border-border bg-background/60"
            />
            <InputOTPSlot
              index={1}
              className="h-11 w-11 text-base border-border bg-background/60"
            />
            <InputOTPSlot
              index={2}
              className="h-11 w-11 text-base border-border bg-background/60"
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot
              index={3}
              className="h-11 w-11 text-base border-border bg-background/60"
            />
            <InputOTPSlot
              index={4}
              className="h-11 w-11 text-base border-border bg-background/60"
            />
            <InputOTPSlot
              index={5}
              className="h-11 w-11 text-base border-border bg-background/60"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Verify button */}
      <Button
        type="button"
        size="lg"
        disabled={otpValue.length < 6}
        onClick={() => onVerify(otpValue)}
        className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold tracking-wide glow-primary-hover transition-all duration-200 disabled:opacity-50"
        data-ocid="otp.submit_button"
      >
        Verify Code
      </Button>

      {/* Resend + Back */}
      <div className="flex flex-col items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={resendTimer > 0}
          onClick={handleResend}
          className="text-muted-foreground hover:text-foreground text-xs disabled:opacity-60"
          data-ocid="otp.secondary_button"
        >
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          data-ocid="otp.cancel_button"
        >
          <ArrowLeft size={12} />
          Back to sign up
        </button>
      </div>
    </motion.div>
  );
}

function AuthCard({
  login,
  isLoggingIn,
  isInitializing,
}: {
  login: () => void;
  isLoggingIn: boolean;
  isInitializing: boolean;
}) {
  // Sign In fields
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up fields
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // OTP state — separate for sign-in and sign-up
  const [signUpOtpStep, setSignUpOtpStep] = useState<"form" | "otp">("form");
  const [signInOtpStep, setSignInOtpStep] = useState<"form" | "otp">("form");
  const [generatedOtp, setGeneratedOtp] = useState("");

  // Auto-derive username from email local part
  function handleSignupEmailChange(val: string) {
    setSignupEmail(val);
    const local = val.split("@")[0];
    if (local) setUsername(local);
  }

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!signInEmail) {
      toast.error("Please enter your email to receive an OTP.");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    toast.success(`OTP sent to ${signInEmail}`, {
      description: `Your verification code is: ${code}`,
      duration: 20000,
    });
    setSignInOtpStep("otp");
  }

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!signupEmail) {
      toast.error("Please enter your email to receive an OTP.");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    toast.success(`OTP sent to ${signupEmail}`, {
      description: `Your verification code is: ${code}`,
      duration: 20000,
    });
    setSignUpOtpStep("otp");
  }

  function handleOtpVerify(entered: string) {
    if (entered === generatedOtp) {
      toast.success("Email verified!");
      // Store email/name in sessionStorage so dashboard can show them
      try {
        const email = signInOtpStep === "otp" ? signInEmail : signupEmail;
        if (email) sessionStorage.setItem("ms_user_email", email);
        if (fullName) sessionStorage.setItem("ms_user_name", fullName);
        else if (username) sessionStorage.setItem("ms_user_name", username);
      } catch {}
      login();
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  }

  function handleResend(emailForResend: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    toast.success(`OTP resent to ${emailForResend}`, {
      description: `Your new verification code is: ${code}`,
      duration: 20000,
    });
  }

  const googleButtonContent = isLoggingIn ? (
    <span className="flex items-center gap-2">
      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
      Connecting...
    </span>
  ) : isInitializing ? (
    "Initializing..."
  ) : null;

  return (
    <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm shadow-card p-8">
      <Tabs
        defaultValue="signin"
        onValueChange={() => {
          // Reset OTP steps when switching tabs
          setSignUpOtpStep("form");
          setSignInOtpStep("form");
          setGeneratedOtp("");
        }}
      >
        <TabsList className="w-full mb-6 bg-muted/40">
          <TabsTrigger value="signin" className="flex-1">
            Sign In
          </TabsTrigger>
          <TabsTrigger value="signup" className="flex-1">
            Sign Up
          </TabsTrigger>
        </TabsList>

        {/* ── Sign In ── */}
        <TabsContent value="signin">
          <div className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  className="bg-background/60"
                  disabled={signInOtpStep === "otp"}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="bg-background/60"
                  disabled={signInOtpStep === "otp"}
                />
              </div>
              {signInOtpStep === "form" && (
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold tracking-wide glow-primary-hover transition-all duration-200 mt-2"
                >
                  Send OTP & Sign In
                </Button>
              )}
            </form>

            {/* OTP section — shown at bottom after email submitted */}
            <AnimatePresence>
              {signInOtpStep === "otp" && (
                <motion.div
                  key="signin-otp-inline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <OTPScreen
                    email={signInEmail}
                    onVerify={handleOtpVerify}
                    onBack={() => setSignInOtpStep("form")}
                    onResend={handleResend}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {signInOtpStep === "form" && (
              <>
                <Divider />
                <Button
                  type="button"
                  onClick={login}
                  disabled={isLoggingIn || isInitializing}
                  size="lg"
                  className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold tracking-wide glow-primary-hover transition-all duration-200"
                >
                  {googleButtonContent ?? "Sign in with Google Account"}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-1">
                  Secured by Internet Computer Protocol
                </p>
              </>
            )}
          </div>
        </TabsContent>

        {/* ── Sign Up ── */}
        <TabsContent value="signup">
          <div className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="signup-fullname">Full Name</Label>
                <Input
                  id="signup-fullname"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-background/60"
                  disabled={signUpOtpStep === "otp"}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  type="text"
                  autoComplete="username"
                  placeholder="janedoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background/60"
                  disabled={signUpOtpStep === "otp"}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={(e) => handleSignupEmailChange(e.target.value)}
                  className="bg-background/60"
                  disabled={signUpOtpStep === "otp"}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showSignupPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="bg-background/60 pr-10"
                    disabled={signUpOtpStep === "otp"}
                  />
                  <button
                    type="button"
                    aria-label={
                      showSignupPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowSignupPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={0}
                    disabled={signUpOtpStep === "otp"}
                  >
                    {showSignupPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              {signUpOtpStep === "form" && (
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold tracking-wide glow-primary-hover transition-all duration-200 mt-2"
                >
                  Create Account
                </Button>
              )}
            </form>

            {/* OTP section — shown at bottom after form submitted */}
            <AnimatePresence>
              {signUpOtpStep === "otp" && (
                <motion.div
                  key="signup-otp-inline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <OTPScreen
                    email={signupEmail}
                    onVerify={handleOtpVerify}
                    onBack={() => setSignUpOtpStep("form")}
                    onResend={handleResend}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {signUpOtpStep === "form" && (
              <>
                <Divider />
                <Button
                  type="button"
                  onClick={login}
                  disabled={isLoggingIn || isInitializing}
                  size="lg"
                  className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold tracking-wide glow-primary-hover transition-all duration-200"
                >
                  {googleButtonContent ?? "Sign up with Google Account"}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-1">
                  New? Google Account will guide you through setup.
                </p>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function LandingPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      <GridBackground />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
            <span className="text-primary font-display font-bold text-xs tracking-wider">
              MS
            </span>
          </div>
          <span className="font-display font-semibold text-foreground tracking-wide text-sm">
            Market Scout
          </span>
        </div>
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-border/50 text-muted-foreground opacity-50 cursor-not-allowed"
          disabled
          aria-label="Notifications (login required)"
        >
          <Bell size={16} />
        </button>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Intelligence Platform
          </div>

          <h1 className="font-display font-bold leading-tight tracking-tight mb-6">
            <span className="block text-xl sm:text-2xl text-foreground">
              STAY AHEAD OF <span className="text-gradient">WHAT MATTERS</span>
            </span>
            <span className="block text-lg sm:text-xl mt-1.5 text-foreground/80">
              Weekly job & market updates —{" "}
              <span className="text-gradient">no searching needed</span>
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Market Scout aggregates key market intelligence across sectors so
            you see what moved — without digging through dozens of sources.
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-sm mx-auto"
        >
          <AuthCard
            login={login}
            isLoggingIn={isLoggingIn}
            isInitializing={isInitializing}
          />
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.title}
                type="button"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                className="rounded-lg border border-border/50 bg-card/40 p-4 text-center hover:border-primary/50 hover:bg-card/70 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-8 h-8 mx-auto mb-3 rounded bg-primary/10 flex items-center justify-center">
                  <Icon size={16} className="text-primary" />
                </div>
                <p className="text-xs font-semibold text-foreground mb-1">
                  {f.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </button>
            );
          })}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-4 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}.{" "}
          <a
            href="https://Dreamcrafter.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with love using Dreamcrafter
          </a>
        </p>
      </footer>
    </div>
  );
}
