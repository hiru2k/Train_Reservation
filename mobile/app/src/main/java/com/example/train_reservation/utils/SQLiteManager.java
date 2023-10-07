package com.example.train_reservation.utils;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.train_reservation.models.User;

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
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_USERS);
        onCreate(db);
    }

    public void insertUser(User user) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COLUMN_USERNAME, user.getUsername());
        values.put(COLUMN_NIC, user.getNic());
        values.put(COLUMN_ROLE, user.getRole());
        values.put(COLUMN_PASSWORD, user.getPassword());
        values.put(COLUMN_EMAIL, user.getEmail());
        values.put(COLUMN_PHONE, user.getPhone());
        values.put(COLUMN_STATUS, user.getStatus());
        db.insert(TABLE_USERS, null, values);
        db.close();
    }
}
