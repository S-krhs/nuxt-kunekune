export type Profile = {
  tenant_id: number,
  header_text: string,
  profile_name: string,
  introduction: string,
  image_url: string,
  image_name: string | null,
  image_alt: string | null,
  descriptions: string | null
}