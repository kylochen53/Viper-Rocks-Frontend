import Link from "next/link";
import { getServerSession, Session } from "next-auth";
import { useState, useEffect } from "react";
import { options } from "../../api/auth/[...nextauth]/options";

export const Nav = async () => {
  const session = await getServerSession();

  /*
  The code will not work if using useEffect for some reason
  Will need to fix this later
  For now make Nav async -J.P 
  */

  // const [session, setSession] = useState<Session | null>(null);
  // useEffect(() => {
  //   const fetchSession = async () => {
  //     try {
  //       const sessionData = await getServerSession();
  //       setSession(sessionData);
  //     } catch (error) {
  //       console.error('Error fetching session:', error);
  //       setSession(null);
  //     }
  //   };
  //   fetchSession();
  // }, []);

  console.log(session);

  return (
    <>
      <header id="NavHeaderInternal" className="sticky top-0 z-30">
        <div className="AppBarInternal sticky lg:relative top-0 z-30">
          <div className="bg-gradient-to-r from-jpl-red to-jpl-red-darker text-white font-medium relative z-10">
            <div className="flex flex-row px-4 lg:container mx-auto py-2 items-center justify-between">
              <div className="flex flex-row items-center py-px">
                <a
                  href="//jpl.nasa.gov"
                  aria-label="JPL Space"
                  className="block mr-10"
                >
                  <svg
                    className="LogoJPL text-white lg:w-14.5"
                    width="74"
                    height="22"
                    viewBox="0 0 74 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M14.598 0v14.804a1.36 1.36 0 0 1-1.336 1.336H2.982L0 21.897h16.757c2.673 0 5.037-2.775 5.037-5.346V0h-7.196zM70.317 16.14H60.14a1.36 1.36 0 0 1-1.337-1.336V0h-7.196v16.551c0 2.57 2.365 5.346 5.038 5.346h16.757l-3.085-5.757zM49.037 3.495C47.907 1.336 45.542 0 43.075 0H23.747v22h7.197V5.757h9.663c1.337 0 2.468 1.13 2.468 2.467 0 1.337-1.131 2.468-2.468 2.468h-9.663l2.981 5.757h9.047c2.467 0 4.729-1.337 5.962-3.496.412-.72.72-1.439.925-2.261.206-.823.309-1.645.309-2.468 0-.822-.103-1.645-.309-2.467-.102-.822-.41-1.542-.822-2.262z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <a
                  className="hidden lg:flex flex-row items-center text-3xl py-px leading-tighter tracking-wide"
                  href="/"
                  title="VIPER ROCKS"
                >
                  <span></span>
                  <span className="border-l border-white pl-5 ml-5">
                    LUNAR ROCKS
                  </span>
                </a>
              </div>
              <div className="flex flex-nowrap -mr-2">
                {session ? (
                  <Link
                    href="/api/auth/signout?callbackUrl=/"
                    className="flex flex-nowrap items-center focus:outline-none focus:ring-2 mr-2 py-1"
                  >
                    <span className="hidden lg:block mr-2">Sign Out</span>
                    <span className="block flex-shrink-0">
                      <svg
                        className="IconUser"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M10.5 0C4.7 0 0 4.7 0 10.5S4.7 21 10.5 21 21 16.3 21 10.5 16.3 0 10.5 0zm5.42 17.867c-1.525 1.143-3.43 1.778-5.42 1.778-2.032 0-3.938-.635-5.42-1.778v-.593a2.701 2.701 0 0 1 2.71-2.71c.466 0 1.143.509 2.71.509 1.524 0 2.202-.508 2.71-.508a2.729 2.729 0 0 1 2.71 2.71v.592zm1.27-1.143c-.297-1.99-1.948-3.514-3.98-3.514-.89 0-1.313.508-2.71.508-1.44 0-1.863-.508-2.71-.508-2.074 0-3.725 1.524-4.022 3.514-1.524-1.651-2.413-3.81-2.413-6.224A9.134 9.134 0 0 1 10.5 1.355c5.038 0 9.145 4.107 9.145 9.145 0 2.413-.931 4.573-2.456 6.224zM10.5 4.742a3.731 3.731 0 0 0-3.726 3.726 3.704 3.704 0 0 0 3.726 3.726 3.731 3.731 0 0 0 3.726-3.726c0-2.033-1.694-3.726-3.726-3.726zm0 6.097a2.367 2.367 0 0 1-2.371-2.371c0-1.27 1.059-2.371 2.371-2.371 1.27 0 2.371 1.1 2.371 2.37 0 1.313-1.1 2.372-2.371 2.372z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </Link>
                ) : (
                  <div className="flex">
                    <Link
                      href="/CreateUser"
                      className="flex flex-nowrap items-center focus:outline-none focus:ring-2 mr-2 py-1"
                    >
                      <span className="lg:block mr-2">Join</span>
                    </Link>

                    <Link
                      href="/api/auth/signin"
                      className="flex flex-nowrap items-center focus:outline-none focus:ring-2 mr-2 py-1"
                    >
                      <span className="hidden lg:block mr-2">Sign In</span>
                      <span className="block flex-shrink-0">
                        <svg
                          className="IconUser"
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            d="M10.5 0C4.7 0 0 4.7 0 10.5S4.7 21 10.5 21 21 16.3 21 10.5 16.3 0 10.5 0zm5.42 17.867c-1.525 1.143-3.43 1.778-5.42 1.778-2.032 0-3.938-.635-5.42-1.778v-.593a2.701 2.701 0 0 1 2.71-2.71c.466 0 1.143.509 2.71.509 1.524 0 2.202-.508 2.71-.508a2.729 2.729 0 0 1 2.71 2.71v.592zm1.27-1.143c-.297-1.99-1.948-3.514-3.98-3.514-.89 0-1.313.508-2.71.508-1.44 0-1.863-.508-2.71-.508-2.074 0-3.725 1.524-4.022 3.514-1.524-1.651-2.413-3.81-2.413-6.224A9.134 9.134 0 0 1 10.5 1.355c5.038 0 9.145 4.107 9.145 9.145 0 2.413-.931 4.573-2.456 6.224zM10.5 4.742a3.731 3.731 0 0 0-3.726 3.726 3.704 3.704 0 0 0 3.726 3.726 3.731 3.731 0 0 0 3.726-3.726c0-2.033-1.694-3.726-3.726-3.726zm0 6.097a2.367 2.367 0 0 1-2.371-2.371c0-1.27 1.059-2.371 2.371-2.371 1.27 0 2.371 1.1 2.371 2.37 0 1.313-1.1 2.372-2.371 2.372z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:hidden block relative z-30 bg-white shadow-lg py-4">
            <a
              className="px-4 lg:px-0 lg:container mx-auto flex flex-row items-center leading-tight tracking-wide font-medium text-gray-dark"
              href="/"
              title="VIPER ROCKS"
            >
              <span className="text-3xl"></span>
              <span className="text-lg border-l-2 border-red-dark pl-3 ml-3">
                VIPER ROCKS
              </span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};