/* Different gateTypes correspond to different states of the auth users
 * - signedIn: user is signed in
 * - signedOut: user is signed out (only signed out users can view this content, signedIn users will NOT)\
 * - hasXFeeature: user has access to a specific feature (neural search, recommend etc)
 */
export type GateTypes = "signedIn" | "signedOut" | "hasXFeature";
