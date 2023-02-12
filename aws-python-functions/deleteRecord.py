import boto3
import io
import abc
from openpyxl import load_workbook

# ===============================================================
# Database Logic For Python 
# ===============================================================
list_of_session_tokens = {'abc1', 'abc2', 'abc3', 'abc4', 'abc5'}


class Database(abc.ABC):
    @abc.abstractclassmethod
    def connect(self):
        pass
    @abc.abstractclassmethod
    def disconnect(self):
        pass
    @abc.abstractclassmethod
    def query(self, q = ''):
        pass


class DatabaseManagementController:
    def __init__(self):
        self.database = None

    def connect(self):
        self.database.connect()
    
    def disconnect(self):
        print("disconnecting from database")
    
    def query(self, q = ''): 
        self.database.query(q)

    def setDatabase(self, database = Database):
        self.database = database
        return self

    @staticmethod
    def instance():
        return DatabaseManagementController()

class ExcelSheetTestDatabase(Database):
    def __init__(self):
        self.s3 = boto3.client('s3')
        self.workbook = None 
        self.sheet_names = []
        self.current_sheet = ''

    # Private Methods 
    def __search():
        pass 

    def __delete():
        pass 

    def __set_worksheet(self, sheet_selected = ''): 
        res = {'status': 'success', 'response': ''}
        if (sheet_selected in self.sheet_names):
            self.current_sheet = sheet_selected
        else:
            res = {'status': 'failed', 'response': 'could not set sheet'}
        return res 



    # Public Methods 
    def connect(self):
        response = self.s3.get_object(Bucket="loanpro-challenge-aws-la-serverlessdeploymentbuck-1mo1bm3wp9e2s", Key="test-data/users_db.xlsx")
        file_stream = response['Body']
        self.workbook = load_workbook(filename = io.BytesIO(file_stream.read()))
        self.sheet_names = self.workbook.sheetnames
        print(self.sheet_names)

    def disconnect(self):
        pass

    def query(self, q = ''):
        db_res = {'status': '', 'response': None}
        queries = q.split()
        db_function_calls = {
            'SET_WORKSHEET': self.__set_worksheet,
            'DELETE': self.__delete,
            'SEARCH': self.__search,

        }
        if (len(queries) > 0 and queries[0] in db_function_calls):
            db_res = db_function_calls.get(queries[0])(queries[1])
        else:
            db_res = {'status': 'failed', 'response': 'invalid query...'}
        return db_res 








# ===============================================================

# # # object_content = response["Body"].read()
# # # print("Object content: %s" % object_content)

# file_stream = response['Body']; 
# wb = load_workbook(filename = io.BytesIO(file_stream.read()))

# sheet_name = wb.sheetnames

# ws2 = wb[sheet_name[2]] 

# print(ws2)


# mark_4_1_for_deletion = "4-6"
# set_flag = "T"


# for row in ws2.rows:
#     print(row[0].value)
#     if (row[0].value == mark_4_1_for_deletion):
#         row[7].value = set_flag


# wb.save("db_clone.xlsx")


# MARK: Handle client deletion of record 
def soft_delete_transaction_record(clientResponse, db = Database):
    print("Soft Deleting Record")
    db.query('SET_WORKSHEET UsersOperationsRecords')
    db.query()


# MARK: Check if client session token is valid
def confirm_client_session_is_alive(userID, sessionToken): 
    print(userID, sessionToken)
    is_valid_session = False
    if (sessionToken in list_of_session_tokens): is_valid_session = True 
    return is_valid_session

# Mark: Check if client POST reponse is valid
def confirm_valid_client_reponse(clientResponse):
    is_valid_response = False 
    if ('operation' in clientResponse and 'sessionToken' in clientResponse and 'userID' in clientResponse and 'record' in clientResponse and clientResponse['operation'] == 'DELETE_RECORD'):
        is_valid_response = confirm_client_session_is_alive(clientResponse['userID'], clientResponse['sessionToken'])
    return is_valid_response

# MARK: AWS Lambda Handler 
def lambda_handler(event, context):
    proceed = False 
    proceed = confirm_valid_client_reponse(event)
    print(proceed)
    # if (proceed): 
    #     db = DatabaseManagementController.instance().setDatabase(ExcelSheetTestDatabase())
    #     db.connect()
    #     soft_delete_transaction_record(event, db)
    

x = {'userID': -1, 'sessionToken': 'abc1', 'operation': 'DELETE_RECORD', 'record': {'id': '', 'operation_id': '', 'date': '2023-02-12T03:57:31.986Z', 'amount': -1, 'user_balance': -1}}
lambda_handler(x, '')

