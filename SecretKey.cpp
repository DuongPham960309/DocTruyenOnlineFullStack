#include <iostream>
#include <string>
#include <chrono>
#include <cstdint>
#include <format>
#include "picosha2.h"

using namespace std;

extern "C" {
    const char* createSecretKey();
    string insertTimeToSignature(uint64_t time_ms, string &signature);

    const char* createSecretKey() {
        static string key;

        auto timePointAtNow = chrono::system_clock::now();
        auto duration = timePointAtNow.time_since_epoch();
        uint64_t time_ms = chrono::duration_cast<chrono::milliseconds>(duration).count();
        
        string signature = to_string(time_ms) + "|ConstantString";
        signature = picosha2::hash256_hex_string(signature);

        key = insertTimeToSignature(time_ms, signature);
        
        return key.c_str();
    }

    string insertTimeToSignature(uint64_t time_ms, string &signature) {
        int secretHexPosition;
        const int baseHexadecimal = 16;
        from_chars(&signature[7], &signature[8], secretHexPosition, baseHexadecimal);
        int timeLength = 16;
        string secretHexString = signature.substr(secretHexPosition, timeLength);
        uint64_t secretHex = stoull(secretHexString, nullptr, baseHexadecimal);
        
        string obfuscateTime = format("{:016x}", ~(time_ms ^ secretHex));

        int timeOffsetPosition;
        from_chars(&signature[0], &signature[1], timeOffsetPosition, baseHexadecimal);

        return signature.insert(1 + timeOffsetPosition, obfuscateTime);
    }
}

//em++ SecretKey.cpp -O3 -std=c++20 -s MODULARIZE=1 -s EXPORT_ES6=1 -s ENVIRONMENT=web -s EXPORTED_FUNCTIONS="['_createSecretKey']" -s EXPORTED_RUNTIME_METHODS="['UTF8ToString']" -o SecretKey.js
