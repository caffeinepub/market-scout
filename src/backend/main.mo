import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  type MarketUpdate = {
    id : Nat;
    title : Text;
    category : Text;
    summary : Text;
    content : Text;
    publishedAt : Int;
    authorId : Principal;
  };

  module MarketUpdate {
    public func compareByPublishedAt(m1 : MarketUpdate, m2 : MarketUpdate) : Order.Order {
      Int.compare(m2.publishedAt, m1.publishedAt);
    };
  };

  type UserPrefs = {
    userId : Principal;
    followedCategories : [Text];
    lastVisitTime : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  // State
  var nextUpdateId = 1;
  let marketUpdates = Map.empty<Nat, MarketUpdate>();
  let userPrefs = Map.empty<Principal, UserPrefs>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Initialize with some sample data
  public shared ({ caller }) func initMarketScoutApp() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can initialize the app");
    };

    let sampleUpdates : [MarketUpdate] = [
      {
        id = nextUpdateId;
        title = "Tech Giants Report Record Profits";
        category = "Tech";
        summary = "Leading tech companies post strong earnings.";
        content = "Detailed analysis of latest tech sector reports...";
        publishedAt = 1688131200;
        authorId = caller;
      },
      {
        id = nextUpdateId + 1;
        title = "Crypto Market Rebounds";
        category = "Crypto";
        summary = "Bitcoin and other cryptocurrencies see price surge.";
        content = "Market experts weigh in on the crypto recovery...";
        publishedAt = 1688019600;
        authorId = caller;
      },
      {
        id = nextUpdateId + 2;
        title = "Healthcare Innovation Advances";
        category = "Health";
        summary = "New medical technologies making headlines.";
        content = "An in-depth look at recent healthcare breakthroughs...";
        publishedAt = 1687897200;
        authorId = caller;
      },
    ];

    for (update in sampleUpdates.values()) {
      marketUpdates.add(update.id, update);
    };

    nextUpdateId += sampleUpdates.size();
  };

  // Market Update CRUD
  public shared ({ caller }) func createUpdate(title : Text, category : Text, summary : Text, content : Text, publishedAt : Int) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create market updates");
    };

    let update : MarketUpdate = {
      id = nextUpdateId;
      title;
      category;
      summary;
      content;
      publishedAt;
      authorId = caller;
    };

    marketUpdates.add(nextUpdateId, update);
    nextUpdateId += 1;
    update.id;
  };

  public query ({ caller }) func getUpdates() : async [MarketUpdate] {
    // Public read - no authorization check needed (guests allowed)
    marketUpdates.values().toArray().sort(MarketUpdate.compareByPublishedAt);
  };

  public query ({ caller }) func getUpdateById(id : Nat) : async ?MarketUpdate {
    // Public read - no authorization check needed (guests allowed)
    marketUpdates.get(id);
  };

  public shared ({ caller }) func editUpdate(id : Nat, title : Text, category : Text, summary : Text, content : Text, publishedAt : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit market updates");
    };

    switch (marketUpdates.get(id)) {
      case (null) { Runtime.trap("Update not found") };
      case (?existing) {
        let updated : MarketUpdate = {
          id;
          title;
          category;
          summary;
          content;
          publishedAt;
          authorId = existing.authorId;
        };
        marketUpdates.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteUpdate(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete market updates");
    };

    if (not marketUpdates.containsKey(id)) {
      Runtime.trap("Update not found");
    };
    marketUpdates.remove(id);
  };

  // Filtering
  public query ({ caller }) func getUpdatesByCategory(category : Text) : async [MarketUpdate] {
    // Public read - no authorization check needed (guests allowed)
    marketUpdates.values().toArray().filter(
      func(update) {
        update.category == category;
      }
    ).sort(MarketUpdate.compareByPublishedAt);
  };

  // User Preferences
  public query ({ caller }) func getUserPrefs() : async UserPrefs {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view preferences");
    };

    switch (userPrefs.get(caller)) {
      case (null) { Runtime.trap("No preferences found for user") };
      case (?prefs) { prefs };
    };
  };

  public shared ({ caller }) func saveUserPrefs(followedCategories : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save preferences");
    };

    let existingPrefs = userPrefs.get(caller);
    let lastVisit = switch (existingPrefs) {
      case (null) { 0 };
      case (?prefs) { prefs.lastVisitTime };
    };

    let prefs : UserPrefs = {
      userId = caller;
      followedCategories;
      lastVisitTime = lastVisit;
    };
    userPrefs.add(caller, prefs);
  };

  public shared ({ caller }) func recordVisit() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record visits");
    };

    let currentTime = 1688229600; // Use Time.now() if available
    let existingPrefs = userPrefs.get(caller);
    let categories = switch (existingPrefs) {
      case (null) { [] };
      case (?prefs) { prefs.followedCategories };
    };

    let prefs : UserPrefs = {
      userId = caller;
      followedCategories = categories;
      lastVisitTime = currentTime;
    };
    userPrefs.add(caller, prefs);
  };

  public query ({ caller }) func getNewUpdatesCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get new updates count");
    };

    switch (userPrefs.get(caller)) {
      case (null) { 0 };
      case (?prefs) {
        var count = 0;
        for (update in marketUpdates.values()) {
          if (update.publishedAt > prefs.lastVisitTime) {
            count += 1;
          };
        };
        count;
      };
    };
  };
};
