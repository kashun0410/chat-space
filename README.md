## users テーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :messages
- has_many :groups, through:  :groups_users

## messages テーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer||
|user_id|integer||
### Association
- belnongs_to :user
- belongs_to :group

## groups テーブル
|Column|Type|Options|
|------|----|-------|
|group_name|text||
|user_id|integer||
### Association
- has_many :messages
- has_many :groups_users
- belongs_to :user

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user