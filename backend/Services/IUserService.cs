﻿/*
 * Filename: IUserService.cs
 * Description: Interface contains the services which are re used in travel agent + back officer apis
 * Author: Hiruni Mudannayake
 */
using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        Task<(bool, string, string, string)> AuthenticateAsync(UserModel Luser);
        Task<bool> AddUserAsync(UserModel newUser);
        Task<bool> GetUserByEmailOrNICAsync(string email, string nic);


        Task<UserModel> GetUserByNICAsync(string nic);

        Task<bool> UpdateUserProfileAsync(String uNIC, UserModel updatedUser);

    }
}
