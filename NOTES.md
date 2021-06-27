• Display user friendly messages
• A well-designed application will display user-friendly messages when things go wrong. For example, when a requested page can't be found.
• Create the following stateless components:
• NotFound - Display a message letting the user know that the requested page can't be found.
• Forbidden - Displays a message letting the user know that they can't access the requested page.
• UnhandledError - Display a message letting the user know that an unexpected error has occurred.
• Add the following routes (listed in the format path - component):
• /notfound - NotFound
• /forbidden - Forbidden
• /error - UnhandledError
• Update the CourseDetail and UpdateCourse components to redirect users to the /notfound path if the requested course isn't returned from the REST API.
• Update your React Router configuration so that if a route isn't matched the NotFound component will be rendered.
• Update the UpdateCourse component to redirect users to the /forbidden path if the requested course isn't owned by the authenticated user.
• Throughout your application, redirect users to the /error path when requests to the REST API return a "500 Internal Server Error" HTTP status code.
• Persist user credentials
• After successfully authenticating a user, persist their credentials using an HTTP cookie or local storage so that the user's authenticated state is maintained even if the application is reloaded or loaded into a new browser tab.
• Redirecting the user after successfully signing in
• After a user successfully signs in, redirect them back to the previous screen (whatever that happens to be).
• For example, if a user attempts to view the "Create Course" screen before they've signed in, they'll be redirected to the "Sign In" screen. After the user has successfully signed in, redirect them to the "Create Course" screen.

From <https://teamtreehouse.com/projects/full-stack-app-with-react-and-a-rest-api#instructions>
