import sqlite3
conn = sqlite3.connect('instance/data.db')
cursor = conn.cursor()
cursor.execute("SELECT * FROM EnergyInsights;")
records = cursor.fetchall()
for record in records:
    print(record)
conn.close()
