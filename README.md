# mocktest
# mocktest

- buka domain/base url sertakan endpoint /login
- masukkan email dan password 
- jika belum ada akun, silahkan melakukan registrasi di /registrasi
- To do list di input pada api, bisa menggunakan postman dengan route api/lists
- contoh data 
{
    "userId":3,
    "to_do":"deploy",
    "status":"done"
}

post api/auth/login -> api login, return data user dan token jwt
                 {
                    "email":"email@gmail.com",
                    "password":"password"
                 }
post api/auth/register -> api register
                {
                    "email":"email@gmail.com",
                    "password":"123456",
                    "name":"IJK",
                    "alamat":"Jl Tekam",
                    "job_role":"Backend Engineer"
                }
get api/auth/whoami -> return user data, tambahkan Authorization dan token pada bagian header

get api/users -> menampilkan semua data user
get api/users/id -> menampilkan data user sesuai id
delete api/users/id -> delete data user sesuai id
delete api/lists/id -> delete data list sesuai id
post api/lists -> menambahkan data pada tabel list
                {
                    "to_do":"To do list",
                    "status":"ongoing",
                    "userId":1
                }


                