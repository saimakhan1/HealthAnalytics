// // // // // "use client";

// // // // // import { createContext, useContext, useEffect, useState } from "react";

// // // // // const AuthContext = createContext(null);

// // // // // export function AuthProvider({ children }) {
// // // // //   const [user, setUser] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const fetchCurrentUser = async () => {
// // // // //     try {
// // // // //       const response = await fetch("/api/auth/me");

// // // // //       if (!response.ok) {
// // // // //         setUser(null);
// // // // //         return;
// // // // //       }

// // // // //       const data = await response.json();

// // // // //       if (data.success) {
// // // // //         setUser(data.user);
// // // // //       } else {
// // // // //         setUser(null);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       setUser(null);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchCurrentUser();
// // // // //   }, []);

// // // // //   const logout = async () => {
// // // // //     try {
// // // // //       await fetch("/api/auth/logout", {
// // // // //         method: "POST",
// // // // //       });

// // // // //       setUser(null);

// // // // //       window.location.href = "/";
// // // // //     } catch (error) {
// // // // //       console.error("Logout error:", error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <AuthContext.Provider
// // // // //       value={{
// // // // //         user,
// // // // //         loading,
// // // // //         logout,
// // // // //         refreshUser: fetchCurrentUser,
// // // // //       }}
// // // // //     >
// // // // //       {children}
// // // // //     </AuthContext.Provider>
// // // // //   );
// // // // // }

// // // // // export function useAuth() {
// // // // //   return useContext(AuthContext);
// // // // // }

// // // // "use client";

// // // // import { createContext, useContext, useEffect, useState } from "react";

// // // // const AuthContext = createContext(null);

// // // // export function AuthProvider({ children }) {
// // // //   const [user, setUser] = useState(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const refreshUser = async () => {
// // // //     try {
// // // //       const response = await fetch("/api/auth/me", {
// // // //         credentials: "include",
// // // //       });

// // // //       if (!response.ok) {
// // // //         setUser(null);
// // // //         return;
// // // //       }

// // // //       const data = await response.json();

// // // //       setUser(data.success ? data.user : null);
// // // //     } catch (error) {
// // // //       console.error("Auth error:", error);
// // // //       setUser(null);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     refreshUser();
// // // //   }, []);

// // // //   const logout = async () => {
// // // //     try {
// // // //       await fetch("/api/auth/logout", {
// // // //         method: "POST",
// // // //         credentials: "include",
// // // //       });

// // // //       setUser(null);

// // // //       window.location.href = "/";
// // // //     } catch (error) {
// // // //       console.error("Logout error:", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider
// // // //       value={{
// // // //         user,
// // // //         loading,
// // // //         refreshUser,
// // // //         logout,
// // // //       }}
// // // //     >
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // }

// // // // export function useAuth() {
// // // //   return useContext(AuthContext);
// // // // }

// // // "use client";

// // // import { createContext, useContext, useEffect, useState } from "react";

// // // const AuthContext = createContext(null);

// // // export function AuthProvider({ children }) {
// // //   const [user, setUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   const refreshUser = async () => {
// // //     try {
// // //       const response = await fetch("/api/auth/me", {
// // //         credentials: "include",
// // //       });

// // //       if (!response.ok) {
// // //         setUser(null);
// // //         localStorage.removeItem("health_app_user");
// // //         return;
// // //       }

// // //       const data = await response.json();
// // //       if (data.success && data.user) {
// // //         setUser(data.user);
// // //         localStorage.setItem("health_app_user", JSON.stringify(data.user));
// // //       } else {
// // //         setUser(null);
// // //         localStorage.removeItem("health_app_user");
// // //       }
// // //     } catch (error) {
// // //       console.error("Auth error:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     // LocalStorage থেকে দ্রুত স্টেট লোড করা (Authentication Required সমস্যা সমাধানের জন্য)
// // //     const storedUser = localStorage.getItem("health_app_user");
// // //     if (storedUser) {
// // //       try {
// // //         setUser(JSON.parse(storedUser));
// // //       } catch (e) {
// // //         console.error("Failed to parse stored user", e);
// // //       }
// // //     }
// // //     refreshUser();
// // //   }, []);

// // //   const logout = async () => {
// // //     try {
// // //       await fetch("/api/auth/logout", {
// // //         method: "POST",
// // //         credentials: "include",
// // //       });

// // //       setUser(null);
// // //       localStorage.removeItem("health_app_user");
// // //       window.location.href = "/";
// // //     } catch (error) {
// // //       console.error("Logout error:", error);
// // //     }
// // //   };

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{
// // //         user,
// // //         loading,
// // //         refreshUser,
// // //         logout,
// // //       }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // }

// // // export function useAuth() {
// // //   return useContext(AuthContext);
// // // }

// // "use client";

// // import { createContext, useContext, useEffect, useState } from "react";

// // const AuthContext = createContext(null);

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const refreshUser = async () => {
// //     try {
// //       const response = await fetch("/api/auth/me", {
// //         credentials: "include",
// //       });

// //       if (!response.ok) {
// //         setUser(null);
// //         localStorage.removeItem("health_app_user");
// //         return;
// //       }

// //       const data = await response.json();
// //       if (data.success && data.user) {
// //         setUser(data.user);
// //         localStorage.setItem("health_app_user", JSON.stringify(data.user));
// //       } else {
// //         setUser(null);
// //         localStorage.removeItem("health_app_user");
// //       }
// //     } catch (error) {
// //       console.error("Auth error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     // Restore session immediately from localStorage on refresh
// //     const storedUser = localStorage.getItem("health_app_user");
// //     if (storedUser) {
// //       try {
// //         setUser(JSON.parse(storedUser));
// //       } catch (e) {
// //         console.error("Failed to parse stored user", e);
// //       }
// //     }
// //     refreshUser();
// //   }, []);

// //   const logout = async () => {
// //     try {
// //       await fetch("/api/auth/logout", {
// //         method: "POST",
// //         credentials: "include",
// //       });

// //       setUser(null);
// //       localStorage.removeItem("health_app_user");
// //       window.location.href = "/";
// //     } catch (error) {
// //       console.error("Logout error:", error);
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         loading,
// //         refreshUser,
// //         logout,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   return useContext(AuthContext);
// // }

// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ১. অ্যাপ লোড বা রিফ্রেশ হলে আগে LocalStorage চেক করা
//   useEffect(() => {
//     const storedUser = localStorage.getItem("health_app_user");
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (e) {
//         console.error("Failed to parse local user:", e);
//       }
//     }
//     refreshUser();
//   }, []);

//   const refreshUser = async () => {
//     try {
//       const response = await fetch("/api/auth/me", {
//         credentials: "include",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success && data.user) {
//           setUser(data.user);
//           localStorage.setItem("health_app_user", JSON.stringify(data.user));
//         }
//       }
//       // নোট: 401 দিলেও LocalStorage-এর ডাটা সঙ্গে সঙ্গে ডিলিট হবে না
//     } catch (error) {
//       console.error("Auth verification error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       setUser(null);
//       localStorage.removeItem("health_app_user");
//       window.location.href = "/login";
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         refreshUser,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("health_app_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse local user:", e);
      }
    }
    refreshUser();
  }, []);

  const refreshUser = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem("health_app_user", JSON.stringify(data.user));
        }
      } else if (response.status === 401) {
        // Clear cached user if session is invalid or expired
        setUser(null);
        localStorage.removeItem("health_app_user");
      }
    } catch (error) {
      console.error("Auth verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("health_app_user");
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
