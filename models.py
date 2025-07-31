from peewee import *
import bcrypt
from datetime import datetime
import os
from dotenv import load_dotenv
import uuid

load_dotenv()

db = SqliteDatabase(os.getenv('DATABASE_PATH', 'database.db'))

class BaseModel(Model):
    class Meta:
        database = db

class User(BaseModel):
    username = CharField(unique=True)
    password = CharField()
    is_superadmin = BooleanField(default=False)
    created_at = DateTimeField(default=datetime.now)
    
    @classmethod
    def create_user(cls, username, password, is_superadmin=False):
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        return cls.create(
            username=username,
            password=hashed.decode('utf-8'),
            is_superadmin=is_superadmin
        )
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
    
    def change_password(self, new_password):
        hashed = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
        self.password = hashed.decode('utf-8')
        self.save()

class Client(BaseModel):
    name = CharField()
    phone = CharField()
    promised_payment_date = DateField(null=True)
    comment = TextField(null=True)
    photo = CharField(null=True)
    balance = DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = DateTimeField(default=datetime.now)
    
    def save_photo(self, file):
        """Save uploaded photo and return filename"""
        if not file:
            return None
            
        # Create uploads directory if it doesn't exist
        upload_dir = 'static/uploads'
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        
        # Generate unique filename
        filename = f"{uuid.uuid4().hex}_{file.filename}"
        filepath = os.path.join(upload_dir, filename)
        
        # Save file
        file.save(filepath)
        
        # Update photo field
        self.photo = filename
        return filename
    
    def get_photo_url(self):
        """Get photo URL for display"""
        if self.photo:
            return f'/static/uploads/{self.photo}'
        return None

class Transaction(BaseModel):
    client = ForeignKeyField(Client, backref='transactions')
    amount = DecimalField(max_digits=10, decimal_places=2)
    transaction_type = CharField(choices=['debit', 'credit'])  # debit = mijozning qarzi, credit = kompaniyaning qarzi
    date = DateField()
    comment = TextField(null=True)
    created_at = DateTimeField(default=datetime.now)

class CompanyInfo(BaseModel):
    name = CharField(null=True)
    phone = CharField(null=True)
    email = CharField(null=True)
    address = CharField(null=True)

def create_tables():
    with db:
        db.create_tables([User, Client, Transaction, CompanyInfo])
        
        # Superadmin yaratamiz agar yo'q bo'lsa
        try:
            User.get(User.username == os.getenv('SUPER_ADMIN_USERNAME'))
        except User.DoesNotExist:
            User.create_user(
                username=os.getenv('SUPER_ADMIN_USERNAME'),
                password=os.getenv('SUPER_ADMIN_PASSWORD'),
                is_superadmin=True
            )
        
        # Kompaniya ma'lumotlarini yaratamiz agar yo'q bo'lsa
        if not CompanyInfo.select().exists():
            CompanyInfo.create()

if __name__ == '__main__':
    create_tables()