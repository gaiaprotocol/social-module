import UserDetails from "../database-interface/UserDetails.js";

class TempUserDetailsCacher {
  private userDetailsMap = new Map<string, UserDetails>();
}

export default new TempUserDetailsCacher();
