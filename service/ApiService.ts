import axios from "axios";

export class ApiService {
  private urlPrefix = "https://dev.webliens.fr/api.php";

  login(form: Object) {
    const formData = new FormData();
    for (const property in form) {
      formData.append(property, form[property]);
    }
    return axios.post(this.urlPrefix, formData);
  }
}
