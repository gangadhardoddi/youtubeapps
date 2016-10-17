using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Chalkable.Apps.Entities;
using Chalkable.Apps.Entities.Models;

namespace Chalkable.Apps.Web.Controllers
{
    [Authorize]
    public class SimpleApplicationsController : Controller
    {
        private ChalkableAppsContext db = new ChalkableAppsContext();

        // GET: SimpleApplications
        public ActionResult Index()
        {
            return View(db.SimpleApplications.ToList());
        }

        // GET: SimpleApplications/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SimpleApplication simpleApplication = db.SimpleApplications.Find(id);
            if (simpleApplication == null)
            {
                return HttpNotFound();
            }
            return View(simpleApplication);
        }

        // GET: SimpleApplications/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SimpleApplications/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,DefaultSearchOption,Name,Url")] SimpleApplication simpleApplication)
        {
            if (ModelState.IsValid)
            {
                db.SimpleApplications.Add(simpleApplication);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(simpleApplication);
        }

        // GET: SimpleApplications/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SimpleApplication simpleApplication = db.SimpleApplications.Find(id);
            if (simpleApplication == null)
            {
                return HttpNotFound();
            }
            return View(simpleApplication);
        }

        // POST: SimpleApplications/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,DefaultSearchOption,Name,Url")] SimpleApplication simpleApplication)
        {
            if (ModelState.IsValid)
            {
                db.Entry(simpleApplication).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(simpleApplication);
        }

        // GET: SimpleApplications/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SimpleApplication simpleApplication = db.SimpleApplications.Find(id);
            if (simpleApplication == null)
            {
                return HttpNotFound();
            }
            return View(simpleApplication);
        }

        // POST: SimpleApplications/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            SimpleApplication simpleApplication = db.SimpleApplications.Find(id);
            db.SimpleApplications.Remove(simpleApplication);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
