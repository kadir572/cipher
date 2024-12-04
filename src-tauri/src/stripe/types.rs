use serde::Serialize;

#[derive(Serialize)]
pub struct StripeResponse {
    pub(crate) client_secret: String,
    pub(crate) amount: u64,
    pub(crate) currency: String
}

#[derive(Serialize)]
pub struct StripeError {
    pub(crate) code: String,
    pub(crate) message: String,
    pub(crate) param: Option<String>,
    pub(crate) doc_url: String,
}