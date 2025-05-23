// authHandler.js
// Handles OAuth Data that is sent to the database
import prisma from "../../../lib/prisma";

//test auth account
//id = richard_the_goat@gmail.com
//pw = 123Viperr0cks!

export const handleOAuthLogin = async (profile, account) => {
  try {
    // Extract relevant data from profile and account
    const userData = extractUserDataFromProfile(profile);
    const accountData = extractAccountData(account);

    // Check if the user exists in the database
    /*    let user = await prisma.user.findUnique({
            where: { email: userData.email },
          });*/

    // Check if the user exists in the database
    let user;
    let userResponse = await fetch(`http://localhost:8080/api/users/${userData.email}`);
    if (userResponse.exists === true) {
      user = await userResponse.json();
    } else {
      user = null;
    }

    // If the user doesn't exist, create a new user
    /*
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userData.email,
          password: "OAuth",
          username: userData.username === undefined ? profile.name: userData.username,
          profilePicture: userData.picture,
          role: account.provider,
        },
      });
         }
    }
    }*/

    // If the user doesn't exist, create a new user
    if (user.exist !== true) {
      const response = await fetch("http://localhost:8080/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          username: userData.username === undefined ? profile.name : userData.username,
          profilePicture: userData.profilePicture,
          role: account.role
        })
      });
      if (!response.ok) {
        throw new Error("Error creating user: ${response.statusText}");
      }

      user = await response.json();

      //Check interfaces
      //Input 3 ways
      //Path parameter, query, form parameter npm


      // Log the user and account data for debugging
      console.log("********User:", userData);
      console.log("*******Account:", accountData);
      //  console.log("*********User:", user);


      // Create or update the account associated with the user
      /*
      await prisma.account.upsert({
        where: {
          userId: user.id,
          id: accountData.provider === 'Google' ? String(userData.sub) : String(userData.id),
        },
        update: {
          provider: accountData.provider,
          access_token: accountData.access_token,
          scope: accountData.scope,
          profilePicture: userData.picture,

          token_type: accountData.token_type,
          updatedAt: new Date(),
        },

        create: {
          id: accountData.provider === 'Google' ? String(userData.sub) : String(userData.id),
          userId: user.id,
          provider: accountData.provider,
          access_token: accountData.access_token,
          scope: accountData.scope,
          token_type: accountData.token_type,
        },
      });
      */

      // Create or update the account associated with the user
    await fetch("http://localhost:8080/api/accounts/upsert",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
        id: accountData.provider === "Google" ? String(userData.sub) : String(userData.id),
        user_id: user.id,
        provider: accountData.provider,
        access_token: accountData.access_token,
        scope: accountData.scope,
        token_type: accountData.token_type,
        profilePicture: userData.picture,
      }),
    });
      return user;

    }
  } catch (error) {
    console.error("Error handling OAuth login:", error);
    return null;
  }

  // Helper function to extract relevant user data from the profile
  const extractUserDataFromProfile = (profile) => {
    return {
      email: profile.email,
      id: profile.id,
      sub: profile.sub,
      username: profile.username,
      profilePicture: profile.picture,
    };
  };

  // Helper function to extract relevant account data
  const extractAccountData = (account) => {
    return {
      provider: account.provider,
      access_token: account.access_token,
      scope: account.scope,
      token_type: account.token_type,
    };
  };
}