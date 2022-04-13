var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

const session = require('express-session')
const flash = require('connect-flash');
var cors = require('cors')
 
const methodOverride = require('method-override') 
const dashboardRouter = require('./app/dashboard/route');
const emrRouter = require('./app/emr/router');
const therapistRouter = require('./app/therapist/router');
const intervensiRouter = require('./app/intervensi/route');
const usersRouter = require('./app/users/route');
const recommendationRouter = require('./app/recommendation/route');
const queueRouter = require('./app/queue/router');
const handledRouter = require('./app/handled/router');
const handlingRouter = require('./app/handling/route');
const bankRouter = require('./app/bank/route');
const paymentRouter = require('./app/payment/router');
const transactionRouter = require('./app/transaction/router');
const treatmentRouter = require('./app/treatment/route');
const patientRouter = require('./app/patient/route');
const authRouter = require('./app/auth/router');





var app = express();

const URL = `/api/v1`
app.use(cors())


app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte',express.static(path.join(__dirname,'/node_modules/admin-lte/')))

app.use('/', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/emr', emrRouter);
app.use('/therapist', therapistRouter);
app.use('/intervensi', intervensiRouter);
app.use('/recommendation', recommendationRouter);
app.use('/queue', queueRouter);
app.use('/handled', handledRouter);
app.use('/handling', handlingRouter);
app.use('/bank', bankRouter);
app.use('/payment', paymentRouter);
app.use('/transaction', transactionRouter);
app.use('/treatment', treatmentRouter);




// API 
app.use(`${URL}/patients`, patientRouter);
app.use(`${URL}/auth`, authRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
