from flask import request, Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import Column, func, and_
from sqlalchemy import (
    Integer, String, DateTime, Text,
    ForeignKey, text
)
import sys
import os


backend_path = os.path.dirname(os.path.abspath(__file__))
db_file_path = os.path.join(backend_path, "db.sqlite3")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_file_path}"
db = SQLAlchemy(app)
session = db.session


class VideoMeasurement(db.Model):
    __tablename__ = 'video_measurement'

    id = Column(Integer, primary_key=True, autoincrement=True)
    video_id = Column(Integer, ForeignKey('video.id', ondelete="CASCADE"))
    video = relationship("Video", back_populates="measurements")
    measurement_date = Column(DateTime())
    sub_count = Column(Integer, server_default=text("0"))
    comments = Column(Integer, server_default=text("0"))
    subscribersgained = Column(Integer, server_default=text("0"))
    subscriberslost = Column(Integer, server_default=text("0"))
    unsub_views = Column(Integer, server_default=text("0"))
    unsub_likes = Column(Integer, server_default=text("0"))
    unsub_dislikes = Column(Integer, server_default=text("0"))
    unsub_shares = Column(Integer, server_default=text("0"))

    def as_json(self):
        return {
            'id': self.id,
            'video_id': self.video_id,
            'measurement_date': self.measurement_date.isoformat(),
            'subscribers_count': self.sub_count,
            'comments': self.comments,
            'subscribers_gained': self.subscribersgained,
            'subscriberslost': self.subscriberslost,
            'unsub_views': self.unsub_views,
            'unsub_likes': self.unsub_likes,
            'unsub_dislikes': self.unsub_dislikes,
            'unsub_shares': self.unsub_shares,
        }


class Video(db.Model):
    __tablename__ = 'video'

    id = Column(Integer, primary_key=True, autoincrement=True)
    youtube_id = Column(String(128))
    channel_id = Column(Integer, ForeignKey('channel.id'))
    channel = relationship("Channel", back_populates="videos")
    create_date = Column(DateTime())
    title = Column(String(128))
    description = Column(Text())
    duration = Column(Integer)
    measurements = relationship(
        "VideoMeasurement", cascade="all,delete",
        back_populates="video", passive_deletes=True)


class Channel(db.Model):
    __tablename__ = 'channel'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128))
    videos = relationship("Video")


@app.route('/results', methods=['GET'])
def results():
    results = VideoMeasurement.query.all()
    return(jsonify([result.as_json() for result in results]))

@app.route('/api/channels', methods=['GET'])
def channels():    
    subq = db.session.query(VideoMeasurement.video_id, Video.channel_id, Video.id, func.max(VideoMeasurement.measurement_date).label('lastdate')).filter(VideoMeasurement.video_id == Video.id).group_by(Video.channel_id).subquery('t2')
    results = db.session.query(VideoMeasurement).add_column(Video.channel_id).join(Video).join(subq,
     and_(
         VideoMeasurement.video_id == subq.c.video_id,
         VideoMeasurement.measurement_date == subq.c.lastdate,
         Video.channel_id == subq.c.channel_id
    )).all()
    return(jsonify([{"video": result[0].as_json(),"channel": result[1]} for result in results]))

@app.route('/api/videos', methods=['GET'])
def videos():
    subq = db.session.query(VideoMeasurement.video_id, func.max(VideoMeasurement.measurement_date).label('lastdate')).group_by(VideoMeasurement.video_id).subquery('t2')
    results = db.session.query(VideoMeasurement).join(subq,
     and_(
         VideoMeasurement.video_id == subq.c.video_id,
         VideoMeasurement.measurement_date == subq.c.lastdate
    ))
    return(jsonify([result.as_json() for result in results]))


if __name__ == '__main__':
    app.run()
