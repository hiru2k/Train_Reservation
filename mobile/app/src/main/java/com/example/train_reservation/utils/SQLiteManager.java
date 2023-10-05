package com.example.train_reservation.utils;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class SQLiteManager extends SQLiteOpenHelper {
    // Database details
    private static final String DATABASE_NAME = "train_reservation.db";
    private static final int DATABASE_VERSION = 1;
    private static final String TABLE_USERS = "users";
    private static final String COLUMN_ID = "id";
    private static final String COLUMN_USERNAME = "Username";
    private static final String COLUMN_NIC = "NIC";
    private static final String COLUMN_ROLE = "Role";
    private static final String COLUMN_PASSWORD = "Password";
    private static final String COLUMN_EMAIL = "Email";
    private static final String COLUMN_PHONE = "Phone";
    private static final String COLUMN_STATUS = "Status";
    public SQLiteManager(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // Create the users table
        String createTableSQL = "CREATE TABLE IF NOT EXISTS " + TABLE_USERS + " (" +
                COLUMN_NIC + " TEXT PRIMARY KEY, " +
                COLUMN_ID + " INTEGER, " +
                COLUMN_USERNAME + " TEXT, " +
                COLUMN_PASSWORD + " TEXT, " +
                COLUMN_ROLE + " TEXT, " +
                COLUMN_EMAIL + " TEXT, " +
                COLUMN_PHONE + " TEXT, " +
                COLUMN_STATUS + " TEXT);";
        db.execSQL(createTableSQL);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Handle database schema upgrades here
    }

    public boolean registerUser(String username, String password, String nic, String role, String email, String phone, String status) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COLUMN_NIC, nic);
        values.put(COLUMN_USERNAME, username);
        values.put(COLUMN_PASSWORD, password);
        values.put(COLUMN_ROLE, role);
        values.put(COLUMN_EMAIL,email);
        values.put(COLUMN_PHONE, phone);
        values.put(COLUMN_STATUS, status);



        // Add other values to 'values' for other columns

        // Check if NIC already exists
        Cursor cursor = db.rawQuery("SELECT * FROM " + TABLE_USERS + " WHERE " + COLUMN_NIC + " = ?", new String[]{nic});
        if (cursor.getCount() > 0) {
            cursor.close();
            db.close();
            return false; // NIC already exists, registration failed
        }
        cursor.close();

        // NIC doesn't exist, proceed with registration
        // Add other values to 'values' for other columns
        // ...

        // Insert the new user into the database
        long result = db.insert(TABLE_USERS, null, values);
        db.close();

        return result != -1; // Returns true if registration is successful, false otherwise
    }
}
