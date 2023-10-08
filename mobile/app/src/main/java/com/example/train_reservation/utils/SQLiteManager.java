package com.example.train_reservation.utils;

import android.annotation.SuppressLint;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.train_reservation.models.User;

public class SQLiteManager extends SQLiteOpenHelper {
    // Database details
    private static final String DATABASE_NAME = "train_reservation.db";
    private static final int DATABASE_VERSION = 1;
    private static final String TABLE_USERS = "users";

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
        values.put(COLUMN_USERNAME, user.username);
        values.put(COLUMN_NIC, user.nic);
        values.put(COLUMN_ROLE, user.role);
        values.put(COLUMN_PASSWORD, user.password);
        values.put(COLUMN_EMAIL, user.email);
        values.put(COLUMN_PHONE, user.phone);
        values.put(COLUMN_STATUS, user.status);
        db.insert(TABLE_USERS, null, values);
        db.close();
    }


    public void updateUser(User user) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COLUMN_USERNAME, user.username);
        values.put(COLUMN_PASSWORD, user.password);
        values.put(COLUMN_EMAIL, user.email);
        values.put(COLUMN_PHONE, user.phone);
        values.put(COLUMN_STATUS, user.status);

        db.update(TABLE_USERS, values, COLUMN_NIC + " = ?", new String[]{user.nic});
        db.close();
    }


    @SuppressLint("Range")
    public User getUserByNIC(String nic) {
        SQLiteDatabase db = this.getReadableDatabase();
        User user = null;
        String[] columns = {
                COLUMN_USERNAME,
                COLUMN_NIC,
                COLUMN_PASSWORD,
                COLUMN_EMAIL,
                COLUMN_PHONE,
                COLUMN_STATUS
        };

        String selection = COLUMN_NIC + " = ?";
        String[] selectionArgs = {nic};

        Cursor cursor = db.query(TABLE_USERS, columns, selection, selectionArgs, null, null, null);

        try {
            if (cursor != null && cursor.moveToFirst()) {
                user = new User();
                user.username = cursor.getString(cursor.getColumnIndex(COLUMN_USERNAME));
                user.nic = cursor.getString(cursor.getColumnIndex(COLUMN_NIC));
                user.password = cursor.getString(cursor.getColumnIndex(COLUMN_PASSWORD));
                user.email = cursor.getString(cursor.getColumnIndex(COLUMN_EMAIL));
                user.phone = cursor.getString(cursor.getColumnIndex(COLUMN_PHONE));
                user.status = cursor.getString(cursor.getColumnIndex(COLUMN_STATUS));
            }
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
            db.close();
        }
        return user;
    }

    public void deleteUserByNIC(String nic) {
        SQLiteDatabase db = this.getWritableDatabase();
        db.delete(TABLE_USERS, COLUMN_NIC + " = ?", new String[]{nic});
        db.close();
    }

}
