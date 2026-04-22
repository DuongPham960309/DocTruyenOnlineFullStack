#include <iostream>
#include <string>
#include <chrono>
#include <cstdint>

using namespace std;

extern "C" {
    const char* createSecretKey() {
        static string secretKey;

        //auto a = 1;
        auto timePointAtNow = std::chrono::system_clock::now();
        //auto duration = timePointAtNow.time_since_epoch();
        //uint64_t time_ms = chrono::duration_cast<chrono::milliseconds>(duration).count();

        //secretKey = to_string(time_ms) + "|" + "ConstantString";
        //secretKey = to_string(time_ms);
        secretKey = "Hello World";
        
        return secretKey.c_str();
    }
}

//em++ SecretKey.cpp -o SecretKey.wasm --no-entry -s EXPORTED_FUNCTIONS="['_createSecretKey']" -O3