export const authenticatedUserFixture = {
  user: {
    user_id: 123,
    user_firstname: "John",
    user_lastname: "Doe",
    user_name: "John Doe",
    user_email: "john.doe@email.com",
    application_id: "ABC123DEF4",
    user_company: "",
    user_phone: "",
    user_location: "",
    is_verified: false,
    plan: "free",
    write_api_key: "",
    search_api_key: "",
    is_a: false,
    premium_support: false,
  },
  authenticityToken: "123",
};

export const authenticatedAlgoliaEmployeeFixture = {
  user: {
    user_id: 123,
    user_firstname: "John",
    user_lastname: "Doe",
    user_name: "John Doe",
    user_email: "john.doe@email.com",
    application_id: "ABC123DEF4",
    user_company: "",
    user_phone: "",
    user_location: "",
    is_verified: false,
    plan: "free",
    write_api_key: "",
    search_api_key: "",
    is_a: true,
    premium_support: true,
  },
  authenticityToken: "123",
};

export const unauthenticatedUserFixture = {
  user: { anonymous_id: "43de8be5-d1eb-408b-afae-76db6d5b225b" },
  authenticityToken: "",
};
