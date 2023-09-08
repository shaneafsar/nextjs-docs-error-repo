import { cookies } from "next/headers";
import {
  CodeSnippetGroupUI,
  CODE_SNIPPET_COOKIE_NAME,
} from "./CodeSnippetGroupUI";

/* This is split up from CodeSnippetGroupUI because we need to
   access the cookies from the server side and render the ui 
   in all cases without hydration errors or flickering.
*/

export const CodeSnippetGroup = ({ children }) => {
  const title = children[0].props.title;
  try {
    const cookieStore = cookies();
    const languageInCookie = cookieStore.get(CODE_SNIPPET_COOKIE_NAME)?.value;
    const languages: string[] = children.map((child) => child.props.lang);
    return (
      <CodeSnippetGroupUI
        languageInCookie={languageInCookie}
        languages={languages}
        title={title}
      >
        {children}
      </CodeSnippetGroupUI>
    );
  } catch {
    const languages: string[] = children.map((child) => child.props.lang);
    return (
      <CodeSnippetGroupUI languages={languages} title={title}>
        {children}
      </CodeSnippetGroupUI>
    );
  }
};
