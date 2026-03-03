# Market Scout

## Current State
- Landing page has hero with framer-motion y/opacity animations that cause layout shift (shaking)
- Sign Up has OTP step; Sign In does NOT have OTP
- Username field is independent of email field
- Jobs page has 25 Indian companies with no official career page links; Apply Now just shows a toast

## Requested Changes (Diff)

### Add
- OTP verification step on Sign In (after form submit, same flow as Sign Up OTP)
- Official career page URLs for all 25 existing companies
- 10 additional Indian companies with official career links and job roles
- Auto-derive username from email local part (before @) when email changes in Sign Up

### Modify
- Landing page hero: remove `y` translate animation, keep only opacity fade to prevent layout shift / shaking
- Sign In `handleSignIn`: generate OTP, show toast, switch to OTP step; on verify trigger login
- Sign In tab now also has an OTP step state separate from Sign Up OTP step
- `JobCard` Apply Now button: open official careers URL in new tab instead of just showing a toast
- `suggestedCompanies` and `mockResults`: add 10 more companies (total 35)

### Remove
- Nothing

## Implementation Plan
1. In LandingPage.tsx: change hero motion `initial/animate` to only animate `opacity` (no `y` shift)
2. In AuthCard: separate `signInOtpStep` state; Sign In form submit → generate OTP → show OTP screen; on verify → `login()`
3. In AuthCard Sign Up: auto-set `username` from `signupEmail` onChange (take local part before `@`)
4. In JobsPage.tsx:
   - Add `careerLinks` record mapping company name → official careers URL
   - Update `JobCard` Apply Now to open the URL
   - Add 10 more companies to `suggestedCompanies` and `mockResults` with real locations and career links
