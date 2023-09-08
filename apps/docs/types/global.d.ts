export declare global {
  interface Window {
    /** A string of OneTrust groups that have been enabled  */
    OnetrustActiveGroups?: string;
    OneTrust?: {
      OnConsentChanged: function;
      IsAlertBoxClosedAndValid: function;
    };
    analytics: any;
  }
}
